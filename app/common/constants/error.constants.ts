import { StatusCodes } from "http-status-codes";
import { IAwsError, IErrorInterface } from "../interfaces";
import { MongoIdType } from "../types";
import { SchemaNames } from "./routes.constants";

export const ERR_MESSAGES = {
  FORBIDDEN: "Permission denied",
  CONFLICT: "Invalid request",
  UNPROCESSABLE_ENTITY: "Unprocessable Entity",
  UNCAUGHT_ERROR: "Uncaught error",
  USER_CREATE_ERROR: "User create error",
  SAVE_TO_STORAGE_ERROR: "Save to storage error",
  UNKNOWN_ERROR: "Unknown error",
  UNAUTHORIZED: "Unauthorized",
};

export const UNAUTHORIZED = (user?: string): IErrorInterface => ({
  name: "Unauthorized",
  message: `${user || "User"} is unauthorized`,
  status: StatusCodes.UNAUTHORIZED,
});

export const NOT_EXISTING_ENTITY = (entityName?: string): IErrorInterface => ({
  name: "Not existing entity",
  message: `${entityName || "Entity"} not found`,
  status: StatusCodes.NO_CONTENT,
});

export const NOT_FOUND = (entityName?: string): IErrorInterface => ({
  name: "Not found",
  message: `${entityName || "Record"} not found`,
  status: StatusCodes.NOT_FOUND,
});

export const ALREADY_EXIST = (entityName?: string): IErrorInterface => ({
  name: "Already existing entity",
  message: `${entityName || "Record"} is already exist`,
  status: StatusCodes.BAD_REQUEST,
});

export const PERMISSION_DENIED: IErrorInterface = {
  name: "Permission denied",
  message: ERR_MESSAGES.FORBIDDEN,
  status: StatusCodes.FORBIDDEN,
};

export const USER_NOT_EXIST = (user: string) => ({
  name: "User is not exist",
  message: `${user || "User"} is not exist`,
  status: StatusCodes.NOT_FOUND,
});

export const UNKNOWN_ERROR = (error?: null | string | IAwsError) => {
  if (error && typeof error !== "string") {
    const {
      $metadata: { httpStatusCode },
      message,
      name,
    } = error;
    return {
      name,
      code: httpStatusCode,
      message,
    };
  } else {
    return {
      name: "Unknown",
      message: error,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

export const entityNotFoundMessage = (
  theory_id: MongoIdType,
  entity: SchemaNames
) => `${entity} with id ${theory_id} not found`;
