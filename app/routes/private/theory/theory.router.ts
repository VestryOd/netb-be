import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import {
  createTheoryHandler,
  getAllTheoryItems,
  getOneTheoryHandler,
} from "@/controllers/theory.controller";
import { errorHandlerMiddleware, logger } from "@/middlewares";
import {
  theoryIdParamsSchema,
  theoryObjectSchema,
  theoryParentParamsSchema,
  theoryPostResponseSchema,
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

theoryRouter.post(
  SubRoutes.Root,
  logger,
  validator.params(theoryParentParamsSchema),
  validator.body(theoryObjectSchema),
  validator.response(theoryPostResponseSchema),
  createTheoryHandler,
  errorHandlerMiddleware
);

export default theoryRouter;
