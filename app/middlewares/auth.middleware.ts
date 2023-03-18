import { Request, Response, NextFunction } from "express";
import { AuthService } from "@/services/Auth.service";
import { accessLevelByRole } from "@/common/constants";
import { catchErrorHandler } from "@/common/helpers";
import { ExpressCallbackType } from "@/common/types";

const authService = new AuthService();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    authService.validateToken(req.headers.authorization);
    return next();
  } catch (err) {
    catchErrorHandler(err);
    res.send(err);
  }
};

const generateAuthMiddleware = () => {
  const authByRoles = {} as Record<string, ExpressCallbackType>;
  Object.entries(accessLevelByRole).forEach(([key, level]) => {
    authByRoles[key] = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        await authService.validateUserRole(req, level);
        return next();
      } catch (err) {
        catchErrorHandler(err, next);
      }
    };
  });

  return authByRoles;
};

export const authMiddlewareByRole = generateAuthMiddleware();
