import { NextFunction, Request, Response } from "express";

export type ExpressCallbackType = (
  req: Request,
  res: Response,
  next: NextFunction
) => any;
