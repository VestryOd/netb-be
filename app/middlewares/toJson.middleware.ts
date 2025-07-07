import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export const isObject = (val: unknown): val is Record<string, unknown> => {
  return typeof val === "object" && val !== null && !Array.isArray(val);
};

export const transform = <T>(value: T): T => {
  if (Array.isArray(value)) {
    return value.map((item) => transform(item)) as unknown as T;
  }

  if (isObject(value)) {
    const newObj: any = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const val = (value as any)[key];

        if (
          key === "_id" &&
          (val instanceof Types.ObjectId || typeof val === "string")
        ) {
          newObj["id"] = val.toString();
        } else {
          newObj[key] = transform(val);
        }
      }
    }
    return newObj;
  }

  return value;
};

export const toJsonMiddleware = (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const originalSend = res.send;

  res.send = function (body) {
    if (body && typeof body === "object" && body !== null) {
      body = transform(body);
    }

    return originalSend.call(this, body);
  };

  next();
};
