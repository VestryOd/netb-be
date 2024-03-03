import { connection, disconnect, connect, set } from "mongoose";
import { mode, mongoConnect, mongoDbName } from "../app/config";
import * as dotenv from "dotenv";
import * as joi from "joi";
import { ValidationResult } from "joi";

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

export const superUser = envVars.SEED_USER_EMAIL;
export const superUserEmail = envVars.SEED_USER_EMAIL;
export const superUserPassword = envVars.SEED_PASSWORD;

const client = async () => {
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
              console.log(
                `Collection ${collection.collectionName} was removed`
              );
              await collection.drop();
            }
          })
          .catch((err) => console.log("--err", err));
      })
      .catch((err) => console.log("connection problem", err));

    connection.on("error", console.error.bind(console, "connection error:"));

    set("toJSON", {
      virtuals: true,
      transform: (doc, converted) => {
        delete converted._id;
      },
    });
  } catch (e) {
    console.log("Error on the connection to the DB");
  }

  await disconnect()
    .then(() => {
      console.log("Connection to the DB is closed");
      process.exit(1);
    })
    .catch((e) => console.log("-Close connection error", e));
};

client().catch((error) => console.log("--client", error));
