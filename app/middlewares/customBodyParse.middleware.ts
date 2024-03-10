import { Request, Response, NextFunction } from "express";
import { MODE } from "@/common/constants";
import { env } from "../config";

export const customBodyParseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (env === MODE.DEV) {
    const keys = ["content", "links"];
    const { body } = req;
    const result = {};

    Object.entries(body).forEach(([key, value]) => {
      // @ts-ignore
      result[key] =
        keys.includes(key) && typeof value === "string"
          ? JSON.parse(value)
          : value;
    });
    req.body = { ...result };
  }
  next();
};
