import { compose } from "compose-middleware";
import { RequestHandler } from "express";
import { errorHandlerMiddleware } from "./error.middleware";

export * from "./error.middleware";

const commonMiddleware: RequestHandler[] = [];
export const privateRoutesMiddleware = [
  ...commonMiddleware,
  errorHandlerMiddleware,
];

export const composePublicMiddleware = compose(privateRoutesMiddleware);
