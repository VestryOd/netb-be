import * as dotenv from "dotenv";
import * as joi from "joi";
import { ValidationResult } from "joi";
import { DisciplineEnum } from "../common/enums";

dotenv.config();

interface IEnvVarsSchema {
  NODE_ENV: string;
  PORT: string;
  AWS_REGION: string;
}

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid("production", "development", "test")
      .required(),
    PORT: joi.number().positive().required(),
    AWS_REGION: joi.string().default("eu-west-1"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env) as ValidationResult<IEnvVarsSchema>;

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config: { [key: string]: { server_url: string } } = {
  development: {
    server_url: "http://localhost",
  },
};

export const envConf = config[process.env.NODE_ENV || "development"];

export const env = envVars.NODE_ENV;
export const port = envVars.PORT;
export const region = envVars.AWS_REGION;

export const dbsConfig = Object.values(DisciplineEnum);

export const mongoConnect = process.env.MONGO_CONNECTION_STRING;
