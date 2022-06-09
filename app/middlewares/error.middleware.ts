import { Request, Response, NextFunction } from "express";

export interface IError {
  status?: number;
  message: string;
}

export const errorHandlerMiddleware = (
  err: IError,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const { status = 500 } = err;
  err ? res.status(status).json(err) : next();
};
