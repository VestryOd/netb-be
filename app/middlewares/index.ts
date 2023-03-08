import { compose } from "compose-middleware";
import { eventLoggerMiddleware } from "./eventLogger.middleware";
import { authMiddleware } from "./auth.middleware";

export * from "./error.middleware";
export * from "./customBodyParse.middleware";
export * from "./saveMedia.middleware";
export * from "./auth.middleware";

export const composePublicMiddleware = compose([]);

export const composeProtectedMiddleware = compose([
  authMiddleware,
  eventLoggerMiddleware,
]);
