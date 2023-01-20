import { RequestHandler } from "express";
import { compose } from "compose-middleware";
import { errorHandlerMiddleware } from "./error.middleware";
import { eventLoggerMiddleware } from "./eventLogger.middleware";

export * from "./error.middleware";
export * from "./customBodyParse.middleware";

const commonMiddleware: RequestHandler[] = [];
export const publicRoutesMiddleware = [
  ...commonMiddleware,
  eventLoggerMiddleware,
  errorHandlerMiddleware,
];

export const composePublicMiddleware = compose(publicRoutesMiddleware);
