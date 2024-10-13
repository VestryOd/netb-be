import { Request, Response, NextFunction } from "express";
// import { HttpError } from "http-errors";
import { errorLogger } from "@/common/helpers";
import { ExpressJoiError } from "express-joi-validation";

export interface IError {
  statusCode?: number;
  status?: number;
  message: string;
}

export const errorHandlerMiddleware = (
  err: IError | ExpressJoiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ("error" in err && err.error && err.error.isJoi) {
    return res
      .status(err.error?.details?.[0]?.context?.error?.status || 400)
      .json({
        message: err.error.details[0].message,
        details: err.error.details[0].context?.error,
      });
  }
  errorLogger(err, req, res, next);
  // @ts-ignore
  const { status = 500 } = err;
  err ? res.status(status).json(err) : next();
};
