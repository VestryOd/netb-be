import { Request, Response, NextFunction } from "express";
import StatusCodes from "http-status-codes";
import { UserService } from "@/services";
import { userCreatedMessage } from "@/common/constants";
import { catchErrorHandler } from "@/common/helpers";

const userService = new UserService();

export const addNewUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_name, user_email, user_password } = req.body;
    const user = await userService.createUser({
      user_name,
      user_email,
      user_password,
    });
    res.statusCode = StatusCodes.CREATED;
    res.statusMessage = userCreatedMessage({ user_name, user_email });
    res.send(user);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const getAllUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers();
    res.send(users);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const getUserByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;
  try {
    const user = await userService.getUserById(user_id);
    res.statusCode = user ? StatusCodes.OK : StatusCodes.NOT_FOUND;
    res.send(user);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const deleteUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;
  try {
    const deleted = await userService.deleteUser(user_id);
    res.statusCode = deleted ? StatusCodes.ACCEPTED : StatusCodes.NOT_FOUND;
    res.send(deleted);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const updateUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;
  try {
    const updatedUser = await userService.updateOneUser(user_id, {
      ...req.body,
    });
    res.statusCode = updatedUser ? StatusCodes.OK : StatusCodes.NOT_FOUND;
    res.send(updatedUser);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const updateUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;
  const { user_role } = req.body;
  try {
    const userWithNewRole = await userService.updateUserRole(
      user_id,
      user_role
    );
    res.statusCode = userWithNewRole ? StatusCodes.OK : StatusCodes.NOT_FOUND;
    res.send(userWithNewRole);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};
