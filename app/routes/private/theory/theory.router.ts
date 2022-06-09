import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import {
  getAllTheoryItems,
  getOneTheoryHandler,
} from "app/controllers/theory.controller";
import { errorHandlerMiddleware } from "app/middlewares";
import {
  theoryIdParamsSchema,
  theoryParentParamsSchema,
} from "./theory.validators";

const theoryRouter = express.Router({ mergeParams: true });
const validator = createValidator();

theoryRouter.get(
  SubRoutes.Root,
  validator.params(theoryParentParamsSchema),
  getAllTheoryItems as express.RequestHandler,
  errorHandlerMiddleware
);

theoryRouter.get(
  `${SubRoutes.Root}/:theory_id`,
  validator.params(theoryIdParamsSchema),
  getOneTheoryHandler as express.RequestHandler,
  errorHandlerMiddleware
);

export default theoryRouter;
