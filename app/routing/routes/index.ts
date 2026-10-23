import { MainRoutes, QueryParams } from "@/common/constants";
import {
  authMiddleware,
  authMiddlewareByRole,
  disciplineMiddleware,
  protectedDisciplineMiddleware,
} from "@/middlewares";
import { publicDisciplineHandleRouter } from "@/routing/routes/public/discipline.router";
import authRouter from "./public/auth.router";
import { publicDisciplineRouter } from "./public";
import { protectedDisciplineRouter, protectedUserRouter } from "./private";
import { protectedRoleRouter } from "./private/role.router";
import { protectedDisciplineHandleRouter } from "./private/discipline.router";
import { RolesEnum } from "@/common/enums";
import { NextFunction, Request, Response } from "express";

export const routingSchema = [
  {
    prefix: MainRoutes.Auth,
    routes: authRouter,
  },
  {
    prefix: MainRoutes.Disciplines,
    routes: publicDisciplineHandleRouter,
  },
  {
    prefix: `/:${QueryParams.Discipline}`,
    middlewares: [disciplineMiddleware],
    routes: publicDisciplineRouter,
  },
  {
    prefix: "*",
    middlewares: [authMiddleware],
    routes: (req: Request, res: Response, next: NextFunction) => next(),
  },
  {
    prefix: `/:${QueryParams.Discipline}`,
    middlewares: [protectedDisciplineMiddleware],
    routes: protectedDisciplineRouter,
  },
  {
    prefix: MainRoutes.User,
    routes: protectedUserRouter,
  },
  {
    prefix: MainRoutes.Role,
    routes: protectedRoleRouter,
  },
  {
    prefix: MainRoutes.Disciplines,
    middlewares: authMiddlewareByRole[RolesEnum.TEACHER],
    routes: protectedDisciplineHandleRouter,
  },
];
