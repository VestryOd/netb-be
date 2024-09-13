import { connection, disconnect, connect, set, Types } from "mongoose";
import { UploadedFile } from "express-fileupload";
import * as dotenv from "dotenv";
import * as joi from "joi";
import { promises } from "fs";
import { ValidationResult } from "joi";
import { mode, mongoConnect, mongoDbName } from "@/config";
import * as path from "path";
import { IUser } from "@/common/interfaces/IUser";
import { IPracticeServiceCreate, ITheory, ITheoryContent } from "@/common/interfaces";
import { RolesEnum } from "@/common/enums";
import { StorageSdkService } from "@/services";
import { createUser } from "@/db/user.db";
import { createRoles } from "@/db/role.db";
import { log, readDataFromFile } from "@/common/constants";
import { createDisciplines } from "@/db/discipline.db";
import { createMany as generatePractices } from "../app/db/practice.db";
import { bulkCreateMany as generateContents } from "../app/db/content.db";
import { bulkCreateMany as generateTheories } from "../app/db/theory.db";

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
      bufferCommands: false,
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

  let chunks = [];

  for await (const item of items) {
    if (chunks.length === 50) {
      await generatePractices(chunks);
      log.ok(`Practices chunk was added: ${chunks.length}`);
      chunks = [];
    } else {
      chunks.push(item);
    }
  }
  log.ok(`Practices successfully added: ${data.length}`);
  return;
};

/*
 * Function for saving images to AWS bucket, if in the content item is content_image field
 * */
const uploadMedia = async (name: string, discipline: string) => {
  const filePath = path.join(__dirname, `./assets/${name}`);
  const storageService = new  StorageSdkService();

  const data = await promises.readFile(filePath);
  const file = { name, data } as UploadedFile;
  const uploaded = await storageService.saveImagesToStorage(discipline, { 0: file });
  // @ts-ignore
  return uploaded[0]?.imageUrl
};

/*
 * Util function for generating map with disciplines in each theory item
 * */
const getDiscipline = async () => {
  const fileName = path.join(__dirname, "./disciplines.json");
  const data = await readDataFromFile(fileName);
  return data[0].link_name;
}

/*
 * Function for generating content items
 * */
const generateContentItems = async () => {
  const fileName = path.join(__dirname, "./contents.json");
  const data: ITheoryContent[] = await readDataFromFile(fileName);

  const items = [...data];

  const discipline = await getDiscipline();
  for await (const item of items) {
    if ("content_image" in item) {
      const { content_image } = item;
      item.content_image = await uploadMedia(content_image, discipline);
      log.info(`Uploaded url: ${item.content_image}`);
    }
  }

  let chunks = [];

  for await (const item of items) {
    if (chunks.length === 50) {
      await generateContents(chunks);
      log.ok(`Content chunk was added: ${chunks.length}`);
      chunks = [];
    } else {
      chunks.push(item);
    }
  }
  log.ok(`Contents successfully added: ${data.length}`);
  return;
}

/*
 * Generating theories items
 * */
const generateTheoryItems = async (user_id: string) => {
  const fileName = path.join(__dirname, "./theories.json");
  const data: ITheory[] = await readDataFromFile(fileName);

  let chunks = [];

  const items = data.map((el: Omit<ITheory, "created_by">) => ({
    ...el,
    created_by: new Types.ObjectId(user_id),
    created_at: new Date(),
  }))

  for await (const item of items) {
    if (chunks.length === 50) {
      await generateTheories(chunks);
      log.ok(`Theory chunk was added: ${chunks.length}`);
      chunks = [];
    } else {
      chunks.push(item);
    }
  }
  log.ok(`Theory successfully added: ${items.length}`);
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
    await generateTheoryItems(user_id);
    await generateContentItems();
  }

  await disconnect()
    .then(() => {
      log.ok("Connection to the DB is closed");
      process.exit(1);
    })
    .catch((e) => log.error(`Close connection error: ${e}`));
};

startSeeding().catch((e) => console.error(e));
