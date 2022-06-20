import * as express from "express";
import { MainRoutes } from "@/common/constants";
import TheoryRouter from "./theory/theory.router";
import practiceRouter from "./practice/practice.router";

const protectedRouter = express.Router({ mergeParams: true });

protectedRouter.use(MainRoutes.Theory, TheoryRouter);
protectedRouter.use(MainRoutes.Practice, practiceRouter);

export default protectedRouter;
