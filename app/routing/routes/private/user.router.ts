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
  userRequestSchema,
  userRoleRequestSchema,
} from "../../validators";

export const protectedUserRouter = express.Router({ mergeParams: true });
const validator = createValidator();

protectedUserRouter.get(
  SubRoutes.GetAll,
  authMiddlewareByRole[RolesEnum.ADMIN],
  getAllUsersHandler as express.RequestHandler,
  errorHandlerMiddleware
);

protectedUserRouter.get(
  `${SubRoutes.Root}/:userId`,
  authMiddlewareByRole[RolesEnum.USER],
  validator.params(userParamsSchema),
  getUserByIdHandler as express.RequestHandler,
  errorHandlerMiddleware
);

protectedUserRouter.delete(
  `${SubRoutes.DeleteUser}/:userId`,
  authMiddlewareByRole[RolesEnum.USER],
  validator.params(userParamsSchema),
  deleteUserHandler as express.RequestHandler,
  errorHandlerMiddleware
);

protectedUserRouter.put(
  `${SubRoutes.UpdateUser}/:userId`,
  authMiddlewareByRole[RolesEnum.USER],
  validator.params(userParamsSchema),
  validator.body(userRequestSchema),
  updateUserHandler as express.RequestHandler,
  errorHandlerMiddleware
);

protectedUserRouter.patch(
  `${SubRoutes.UpdateRole}/:userId`,
  authMiddlewareByRole[RolesEnum.ADMIN],
  validator.params(userParamsSchema),
  validator.body(userRoleRequestSchema),
  updateUserRole as express.RequestHandler,
  errorHandlerMiddleware
);
