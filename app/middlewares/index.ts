import { compose } from "compose-middleware";
import { RequestHandler } from "express";
import { errorHandlerMiddleware } from "./error.middleware";
import { eventLoggerMiddleware } from "./eventLogger.middleware";

export * from "./error.middleware";

const commonMiddleware: RequestHandler[] = [];
export const privateRoutesMiddleware = [
  ...commonMiddleware,
  eventLoggerMiddleware,
  errorHandlerMiddleware,
];

export const composePublicMiddleware = compose(privateRoutesMiddleware);
