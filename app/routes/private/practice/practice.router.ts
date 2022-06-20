import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import {
  createPracticeHandler,
  deletePracticeHandler,
  getAllPracticeItems,
  getOnePracticeHandler,
  updatePracticeHandler,
} from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";
import { parentParamSchema } from "@/common/validators";
import {
  practiceBasicSchema,
  practiceIdParamsSchema,
} from "./practice.validator";

const practiceRouter = express.Router({ mergeParams: true });
const validator = createValidator();

practiceRouter.get(
  SubRoutes.Root,
  validator.params(parentParamSchema),
  getAllPracticeItems as express.RequestHandler,
  errorHandlerMiddleware
);

practiceRouter.get(
  `${SubRoutes.Root}/:practice_id`,
  validator.params(practiceIdParamsSchema),
  getOnePracticeHandler as express.RequestHandler,
  errorHandlerMiddleware
);

practiceRouter.post(
  SubRoutes.Root,
  validator.params(parentParamSchema),
  validator.body(practiceBasicSchema),
  createPracticeHandler as express.RequestHandler,
  errorHandlerMiddleware
);

practiceRouter.delete(
  `${SubRoutes.Root}/:practice_id`,
  validator.params(practiceIdParamsSchema),
  deletePracticeHandler as express.RequestHandler,
  errorHandlerMiddleware
);

practiceRouter.put(
  `${SubRoutes.Root}/:practice_id`,
  validator.params(practiceIdParamsSchema),
  validator.body(practiceBasicSchema),
  updatePracticeHandler as express.RequestHandler,
  errorHandlerMiddleware
);

export default practiceRouter;
