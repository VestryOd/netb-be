import * as express from "express";
import { MainRoutes } from "@/common/constants";
import TheoryRouter from "./theory/theory.router";

const protectedRouter = express.Router({ mergeParams: true });

protectedRouter.use(MainRoutes.Theory, TheoryRouter);

export default protectedRouter;
