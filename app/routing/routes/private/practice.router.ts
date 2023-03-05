import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import {
  createPracticeHandler,
  deletePracticeHandler,
  updatePracticeHandler,
} from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";
import { parentParamSchema } from "@/common/validators";
import { practiceBasicSchema, practiceIdParamsSchema } from "../../validators";

const protectedPracticeRouter = express.Router({ mergeParams: true });
const validator = createValidator();

protectedPracticeRouter.post(
  SubRoutes.Root,
  validator.params(parentParamSchema),
  validator.body(practiceBasicSchema),
  createPracticeHandler as express.RequestHandler,
  errorHandlerMiddleware
);

protectedPracticeRouter.delete(
  `${SubRoutes.Root}/:practice_id`,
  validator.params(practiceIdParamsSchema),
  deletePracticeHandler as express.RequestHandler,
  errorHandlerMiddleware
);

protectedPracticeRouter.put(
  `${SubRoutes.Root}/:practice_id`,
  validator.params(practiceIdParamsSchema),
  validator.body(practiceBasicSchema),
  updatePracticeHandler as express.RequestHandler,
  errorHandlerMiddleware
);

export default protectedPracticeRouter;
