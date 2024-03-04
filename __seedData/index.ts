import { connection, disconnect, connect, set } from "mongoose";
import { mode, mongoConnect, mongoDbName } from "../app/config";
import * as dotenv from "dotenv";
import * as joi from "joi";
import { ValidationResult } from "joi";
import { IUser } from "../app/common/interfaces/IUser";
import { RolesEnum } from "../app/common/enums";
import { createUser } from "../app/db/user.db";
import * as path from "path";
import { createRoles } from "../app/db/role.db";
import { log, readDataFromFile } from "../app/common/constants";
import { createDisciplines } from "../app/db/discipline.db";
import { createMany as generatePractices } from "../app/db/practice.db";
import { IPracticeServiceCreate } from "../app/common/interfaces";

dotenv.config();

interface IEnvSeedVarsSchema {
  SEED_SUPERUSER: string;
  SEED_USER_EMAIL: string;
  SEED_PASSWORD: string;
}

const envSeedVarsSchema = joi
  .object()
  .keys({
    SEED_SUPERUSER: joi.string().required(),
    SEED_USER_EMAIL: joi
      .string()
      .regex(/^[\w_.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .required(),
    SEED_PASSWORD: joi.string().min(6).required(),
  })
  .unknown();

const { value: envVars, error } = envSeedVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env) as ValidationResult<IEnvSeedVarsSchema>;

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const superUser = envVars.SEED_SUPERUSER;
export const superUserEmail = envVars.SEED_USER_EMAIL;
export const superUserPassword = envVars.SEED_PASSWORD;

const clearDbCollections = async () => {
  try {
    await connect(mongoConnect, {
      dbName: mongoDbName,
      autoIndex: mode === "development",
    })
      .then(async () => {
        console.log("connected!");
        await connection.db
          .collections()
          .then(async (list) => {
            for (const collection of list) {
              log.ok(`Collection ${collection.collectionName} was removed`);
              await collection.drop();
            }
          })
          .catch((err) =>
            log.error(`An error on removing collections occurred: ${err}`)
          );
      })
      .catch((err) => log.error(`Connection problem: ${err}`));

    connection.on("error", console.error.bind(console, "connection error:"));

    set("toJSON", {
      virtuals: true,
      transform: (doc, converted) => {
        delete converted._id;
      },
    });
  } catch (e) {
    log.error("Error on the connection to the DB");
    process.exit(1);
  }
  return;
};

/*
 * Create superUser with data from end file
 * */
const createRootUser = async () => {
  const userData = {
    user_name: superUser,
    user_email: superUserEmail,
    user_password: superUserPassword,
    user_role: RolesEnum.ADMIN,
  } as IUser;

  const user = await createUser(userData);
  log.ok(`Successfully created a root used: ${user.id}`);
  return user.id;
};

/*
 * Create user roles
 * */
const createUserRoles = async () => {
  const fileName = path.join(__dirname, "./roles.json");
  const data = await readDataFromFile(fileName);

  const roles = await createRoles(data);

  log.ok(`Roles successfully added: ${roles.length}`);
  return;
};

/*
 * Create disciplines
 * */
const generateDisciplines = async () => {
  const fileName = path.join(__dirname, "./disciplines.json");
  const data = await readDataFromFile(fileName);

  const disciplines = await createDisciplines(data);

  log.ok(`Disciplines successfully added: ${disciplines.length}`);
  return;
};

/*
 * Generate practice items
 * */
const generatePracticeItems = async (user_id: string) => {
  const fileName = path.join(__dirname, "./practices.json");
  const data = await readDataFromFile(fileName);

  const items = data.map((el: Omit<IPracticeServiceCreate, "created_by">) => ({
    ...el,
    created_by: user_id,
    created_at: new Date(),
  }));

  // TODO: refactor with chunks by 50 or by bulkWrite
  const practices = await generatePractices(items);
  log.ok(`Practices successfully added: ${practices.length}`);
  return;
};

const startSeeding = async () => {
  await clearDbCollections();
  const user_id = await createRootUser();
  await createUserRoles();
  await generateDisciplines();

  const isContentIncluded = process.argv[2] === "full";
  if (isContentIncluded) {
    log.info(
      `Content will be generated: theory with content items & practices, flag: ${process.argv[2]}`
    );
    await generatePracticeItems(user_id);
    // TODO: add theory and content (including pictures uploading)
  }

  await disconnect()
    .then(() => {
      log.ok("Connection to the DB is closed");
      process.exit(1);
    })
    .catch((e) => log.error(`Close connection error: ${e}`));
};

startSeeding().catch((e) => console.error(e));
