import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import {
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  updateUserRole,
} from "@/controllers";
import { errorHandlerMiddleware, authMiddlewareByRole } from "@/middlewares";
import { RolesEnum } from "@/common/enums";
import {
  userParamsSchema,
  userPostResponse,
  userRoleRequestSchema,
} from "../../validators/user.validators";

export const protectedUserRouter = express.Router({ mergeParams: true });
const validator = createValidator();

protectedUserRouter.get(
  SubRoutes.Root,
  authMiddlewareByRole[RolesEnum.ADMIN],
  getAllUsersHandler as express.RequestHandler,
  errorHandlerMiddleware
);

protectedUserRouter.get(
  `${SubRoutes.Root}/:userId`,
  authMiddlewareByRole[RolesEnum.USER],
  validator.params(userParamsSchema),
  validator.response(userPostResponse),
  getUserByIdHandler as express.RequestHandler,
  errorHandlerMiddleware
);

protectedUserRouter.delete(
  `${SubRoutes.Root}/:userId`,
  authMiddlewareByRole[RolesEnum.USER],
  validator.params(userParamsSchema),
  deleteUserHandler as express.RequestHandler,
  errorHandlerMiddleware
);

protectedUserRouter.put(
  `${SubRoutes.Root}/:userId`,
  authMiddlewareByRole[RolesEnum.USER],
  validator.params(userParamsSchema),
  updateUserHandler as express.RequestHandler,
  errorHandlerMiddleware
);

protectedUserRouter.put(
  `${SubRoutes.UpdateRole}/:userId`,
  authMiddlewareByRole[RolesEnum.ADMIN],
  validator.params(userParamsSchema),
  validator.body(userRoleRequestSchema),
  updateUserRole as express.RequestHandler,
  errorHandlerMiddleware
);
