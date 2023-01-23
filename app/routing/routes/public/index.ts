import * as express from "express";
import { MainRoutes } from "@/common/constants";
import publicTheoryRouter from "./theory.router";
import publicPracticeRouter from "./practice.router";

export * from "./user.router";
export * from "./auth.router";

export const publicDisciplineRouter = express.Router({ mergeParams: true });

publicDisciplineRouter.use(MainRoutes.Theory, publicTheoryRouter);
publicDisciplineRouter.use(MainRoutes.Practice, publicPracticeRouter);
