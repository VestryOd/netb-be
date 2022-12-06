import { Request, Response, NextFunction } from "express";
import StatusCodes from "http-status-codes";
import * as bcrypt from "bcrypt";
import { UserService } from "../services";
import { USER_NOT_EXIST, userCreatedMessage } from "../common/constants";
import { loggerHelper, userToResponse } from "@/common/helpers";
import { WinstonLevelEnum } from "../common/enums";

const userService = new UserService();

export const addNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_name, user_email, user_password, user_role } = req.body;
    const user = await userService.createUser({
      user_name,
      user_email,
      user_password,
      user_role,
    });
    res.statusCode = StatusCodes.CREATED;
    res.statusMessage = userCreatedMessage({ user_name, user_email });
    res.send(userToResponse(user));
  } catch (err) {
    loggerHelper.log({
      level: WinstonLevelEnum.Error,
      message: err?.message,
    });
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/require-await
) => {
  const someField: any = null;
  console.log(req, someField);
};
