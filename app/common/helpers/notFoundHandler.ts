import { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import { NOT_FOUND } from "../constants";

export const notFoundHandler = (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  res.statusCode = StatusCodes.NOT_FOUND;
  res.send(NOT_FOUND("Path"));
};
