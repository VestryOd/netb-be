import { NextFunction } from "express";
import { loggerHelper } from "./loggerHelper";
import { WinstonLevelEnum } from "@/common/enums";

export const catchErrorHandler = (err: Error, nextCb?: NextFunction) => {
  loggerHelper.log({
    level: WinstonLevelEnum.Error,
    message: err?.message,
  });
  nextCb?.(err);
};
