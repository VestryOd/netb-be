import { Request, Response, NextFunction } from "express";
import { PERMISSION_DENIED } from "../common/constants";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line @typescript-eslint/require-await
) => {
  const { token } = req.headers;

  if (!token) throw PERMISSION_DENIED;
};
