import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import {
  createTheoryHandler,
  deleteTheoryHandler,
  updateTheoryHandler,
} from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";
import {
  theoryIdParamsSchema,
  theoryObjectRequestSchema,
  theoryPostResponseSchema,
} from "../../validators/theory.validators";
import { parentParamSchema } from "@/common/validators";
import { customBodyParseMiddleware } from "@/middlewares";
import { saveMediaMiddleware } from "@/middlewares/saveMedia.middleware";

const protectedTheoryRouter = express.Router({ mergeParams: true });
const validator = createValidator();

protectedTheoryRouter.post(
  SubRoutes.Root,
  customBodyParseMiddleware,
  saveMediaMiddleware,
  validator.params(parentParamSchema),
  validator.body(theoryObjectRequestSchema),
  validator.response(theoryPostResponseSchema),
  createTheoryHandler,
  errorHandlerMiddleware
);

protectedTheoryRouter.delete(
  `${SubRoutes.Root}/:theory_id`,
  validator.params(theoryIdParamsSchema),
  deleteTheoryHandler as express.RequestHandler,
  errorHandlerMiddleware
);

protectedTheoryRouter.put(
  `${SubRoutes.Root}/:theory_id`,
  customBodyParseMiddleware,
  saveMediaMiddleware,
  validator.params(theoryIdParamsSchema),
  validator.body(theoryObjectRequestSchema),
  updateTheoryHandler as express.RequestHandler,
  errorHandlerMiddleware
);

export default protectedTheoryRouter;
