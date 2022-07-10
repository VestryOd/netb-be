import { loggerHelper } from "./loggerHelper";

export const uncaughtExceptionHandler = (err: any): void => {
  loggerHelper.log({
    level: "error",
    message: `Unhandled exception: ${err.message}, stack: ${err.stack}`,
  });
  loggerHelper.on("finish", () => process.exit(1));
};
