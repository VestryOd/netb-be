import { Request, Response, NextFunction } from "express";
import StatusCodes from "http-status-codes";
import { AuthService } from "@/services/Auth.service";
import { catchErrorHandler } from "@/common/helpers";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_email, user_password } = req.body;

  try {
    const token = await AuthService.authenticate({ user_email, user_password });
    res.status(StatusCodes.OK).json({ token });
  } catch (err) {
    catchErrorHandler(err, next);
  }
};
