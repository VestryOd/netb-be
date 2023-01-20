import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "@/services/Auth.service";
import { rolesConfig } from "@/config";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_email, user_password } = req.body;

  try {
    const token = await AuthService.authenticate({ user_email, user_password });
    res.status(StatusCodes.OK).json({ token });
  } catch (e) {
    next(e);
  }
};

const generateAuthByRoleMiddlewares = () => {
  const authByRoles = {} as Record<string, AuthService>;

  Object.values(rolesConfig).forEach((role) => {
    authByRoles[role] = new AuthService(role);
  });

  return authByRoles;
};

export const authMiddlewareByRole = generateAuthByRoleMiddlewares();
