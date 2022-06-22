import { Request, Response, NextFunction } from "express";
// import { HttpError } from "http-errors";
import { errorLogger } from "@/common/helpers";

export interface IError {
  status?: number;
  message: string;
}

export const errorHandlerMiddleware = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errorLogger(err, req, res, next);
  const { status = 500 } = err;
  err ? res.status(status).json(err) : next();
};
