import { MainRoutes, QueryParams } from "@/common/constants";
import {
  composeProtectedMiddleware,
  composePublicMiddleware,
} from "@/middlewares";
import authRouter from "./public/auth.router";
import publicUserRouter from "./public/user.router";
import { publicDisciplineRouter } from "./public";
import { protectedDisciplineRouter, protectedUserRouter } from "./private";

export const routingSchema = [
  {
    prefix: MainRoutes.Login,
    routes: authRouter,
  },
  {
    prefix: MainRoutes.SignUp,
    routes: publicUserRouter,
  },
  {
    prefix: `/:${QueryParams.Discipline}`,
    middlewares: composePublicMiddleware,
    routes: publicDisciplineRouter,
  },
  {
    prefix: `/:${QueryParams.Discipline}`,
    middlewares: composeProtectedMiddleware,
    routes: protectedDisciplineRouter,
  },
  {
    prefix: MainRoutes.User,
    middlewares: composeProtectedMiddleware,
    routes: protectedUserRouter,
  },
];
