import { IUser } from "@/common/interfaces/IUser";
import { Request, Response, NextFunction } from "express";
import StatusCodes from "http-status-codes";
import { AuthService } from "@/services/Auth.service";
import { catchErrorHandler } from "@/common/helpers";
import jwt_decode from "jwt-decode";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_email, user_password } = req.body;

  try {
    const { accessToken, refreshToken } = await AuthService.authenticate({
      user_email,
      user_password,
    });

    res.cookie("refreshToken", refreshToken.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(refreshToken.exp),
    });

    res.status(StatusCodes.OK).json(accessToken);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refreshToken;
  const { user_email } = jwt_decode<Partial<IUser>>(refreshToken);

  try {
    const accessToken = await AuthService.validateRefreshToken(
      user_email,
      refreshToken
    );
    res.status(StatusCodes.OK).json(accessToken);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};
