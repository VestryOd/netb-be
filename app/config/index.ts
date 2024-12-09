import {
  defaultAWSRegion,
  devDefaultUrl,
  MODE,
  urlValidateMessage,
  urlValidateRegexp,
} from "@/common/constants";
import * as dotenv from "dotenv";
import * as joi from "joi";
import { ValidationResult } from "joi";
import { DisciplineEnum } from "@/common/enums";

dotenv.config();

interface IEnvVarsSchema {
  URL: string;
  NODE_ENV: string;
  PORT: string;
  AWS_REGION: string;
  JWT_SECRET_KEY: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  ACCESS_TOKEN_LIFETIME: string;
  REFRESH_TOKEN_LIFETIME: string;
}

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid(...Object.values(MODE))
      .required(),
    URL: joi
      .string()
      .pattern(urlValidateRegexp)
      .message(urlValidateMessage)
      .default(devDefaultUrl),
    PORT: joi.number().positive().required(),
    AWS_REGION: joi.string().default(defaultAWSRegion),
    JWT_SECRET_KEY: joi.string().required(),
    ACCESS_TOKEN_SECRET: joi.string().required(),
    REFRESH_TOKEN_SECRET: joi.string().required(),
    ACCESS_TOKEN_LIFETIME: joi.string().required(),
    REFRESH_TOKEN_LIFETIME: joi.string().required(),
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
    server_url: devDefaultUrl,
  },
};

export const envConf = config[process.env.NODE_ENV || MODE.DEV];

export const env = envVars.NODE_ENV;
export const port = envVars.PORT;
export const region = envVars.AWS_REGION;
export const jwtSecret = envVars.JWT_SECRET_KEY;
export const basicUrl = envVars.URL;
export const accessSecret = envVars.ACCESS_TOKEN_SECRET;
export const refreshSecret = envVars.REFRESH_TOKEN_SECRET;
export const accessLifetime = envVars.REFRESH_TOKEN_LIFETIME;
export const refreshLifetime = envVars.REFRESH_TOKEN_LIFETIME;

export const mode = envVars.NODE_ENV;

export const disciplineDbsConfig = Object.values(DisciplineEnum);

export const mongoConnect = process.env.MONGO_CONNECTION_STRING;
export const mongoDbName = process.env.MONGO_DB_NAME;
