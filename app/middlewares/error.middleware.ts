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
  console.log("--errorHandlerMiddleware", err);
  err ? res.status(status).json(err) : next();
};

export const logger = (req: Request, _: Response, next: NextFunction) => {
  const { params, body } = req;
  console.log("--REQUEST params:", params);
  console.log("--REQUEST body:", body);
  next();
};
