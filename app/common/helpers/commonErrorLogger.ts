import { IErrorInterface } from "../interfaces";
import { WinstonLevelEnum } from "../enums";
import { loggerHelper } from "./loggerHelper";
import { ERR_MESSAGES } from "../constants";

export const commonErrorLogger = (
  err: IErrorInterface | string,
  level = WinstonLevelEnum.Error
): void => {
  let messageText;
  if (typeof err === "string") {
    messageText = err;
  } else {
    const { message, status } = err;
    const stabText = `${message || ERR_MESSAGES.UNKNOWN_ERROR}`;
    messageText = status ? `${status} - ${stabText}` : `${stabText}`;
  }
  loggerHelper.log({
    level,
    message: messageText,
  });
};
