import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import { authMiddlewareByRole, errorHandlerMiddleware } from "@/middlewares";
import { RolesEnum } from "@/common/enums";
import {
  addNewRoleHandler,
  getAllRolesHandler,
  removeRoleHandler,
} from "@/controllers";
import { roleParamsSchema, roleRequestSchema } from "@/routing/validators";

export const protectedRoleRouter = express.Router({ mergeParams: true });
const validator = createValidator();

protectedRoleRouter.get(
  SubRoutes.GetAll,
  authMiddlewareByRole[RolesEnum.ADMIN],
  getAllRolesHandler as express.RequestHandler,
  errorHandlerMiddleware
);

protectedRoleRouter.delete(
  `${SubRoutes.Root}/:roleId`,
  validator.params(roleParamsSchema),
  authMiddlewareByRole[RolesEnum.ADMIN],
  removeRoleHandler as express.RequestHandler,
  errorHandlerMiddleware
);

protectedRoleRouter.post(
  SubRoutes.Root,
  validator.body(roleRequestSchema),
  authMiddlewareByRole[RolesEnum.ADMIN],
  addNewRoleHandler as express.RequestHandler,
  errorHandlerMiddleware
);
