import { StatusCodes } from "http-status-codes";
import { IAwsError, IErrorInterface } from "../interfaces";

export const ERROR_CONSTANTS = {
  FORBIDDEN: "Permission denied",
  CONFLICT: "Invalid request",
  UNPROCESSABLE_ENTITY: "Unprocessable Entity",
  UNCAUGHT_ERROR: "Uncaught error",
  USER_CREATE_ERROR: "User create error",
  SAVE_TO_STORAGE_ERROR: "Save to storage error",
};

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
