import { loggerHelper } from "./loggerHelper";

export const unhandledPromiseRejectionHandler = (err: any): void => {
  loggerHelper.log({
    level: "error",
    message: `Unhandled promise rejection: ${err.message}, stack: ${err.stack}`,
  });
};
