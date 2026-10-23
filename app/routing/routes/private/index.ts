import * as express from "express";
import { MainRoutes } from "@/common/constants";
import protectedTheoryRouter from "./theory.router";
import protectedPracticeRouter from "./practice.router";
import { authMiddlewareByRole } from "@/middlewares";
import { RolesEnum } from "@/common/enums";
import protectedQuizRouter from "@/routing/routes/private/quiz.router";

export * from "./user.router";

export const protectedDisciplineRouter = express.Router({ mergeParams: true });

protectedDisciplineRouter.use(
  MainRoutes.Quiz,
  authMiddlewareByRole[RolesEnum.USER],
  protectedQuizRouter
);

protectedDisciplineRouter.use(
  MainRoutes.Theory,
  authMiddlewareByRole[RolesEnum.TEACHER],
  protectedTheoryRouter
);
protectedDisciplineRouter.use(
  MainRoutes.Practice,
  authMiddlewareByRole[RolesEnum.TEACHER],
  protectedPracticeRouter
);
