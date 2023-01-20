import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import {
  createTheoryHandler,
  getAllTheoryItems,
  getOneTheoryHandler,
  deleteTheoryHandler,
  updateTheoryHandler,
} from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";
import {
  theoryIdParamsSchema,
  theoryObjectRequestSchema,
  theoryPostResponseSchema,
} from "./theory.validators";
import { parentParamSchema } from "@/common/validators";
import { customBodyParseMiddleware } from "@/middlewares";
import { saveMediaMiddleware } from "@/middlewares/saveMedia.middleware";

const theoryRouter = express.Router({ mergeParams: true });
const validator = createValidator();

theoryRouter.get(
  SubRoutes.Root,
  validator.params(parentParamSchema),
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
  customBodyParseMiddleware,
  saveMediaMiddleware,
  validator.params(parentParamSchema),
  validator.body(theoryObjectRequestSchema),
  validator.response(theoryPostResponseSchema),
  createTheoryHandler,
  errorHandlerMiddleware
);

theoryRouter.delete(
  `${SubRoutes.Root}/:theory_id`,
  validator.params(theoryIdParamsSchema),
  deleteTheoryHandler as express.RequestHandler,
  errorHandlerMiddleware
);

theoryRouter.put(
  `${SubRoutes.Root}/:theory_id`,
  customBodyParseMiddleware,
  saveMediaMiddleware,
  validator.params(theoryIdParamsSchema),
  validator.body(theoryObjectRequestSchema),
  updateTheoryHandler as express.RequestHandler,
  errorHandlerMiddleware
);

export default theoryRouter;
