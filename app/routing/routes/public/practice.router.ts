import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import { parentParamSchema } from "@/common/validators";
import { getAllPracticeItems, getOnePracticeHandler } from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";
import { practiceIdParamsSchema } from "../../validators";

const publicPracticeRouter = express.Router({ mergeParams: true });
const validator = createValidator();

publicPracticeRouter.get(
  SubRoutes.Root,
  validator.params(parentParamSchema),
  getAllPracticeItems as express.RequestHandler,
  errorHandlerMiddleware
);

publicPracticeRouter.get(
  `${SubRoutes.Root}/:practice_id`,
  validator.params(practiceIdParamsSchema),
  getOnePracticeHandler as express.RequestHandler,
  errorHandlerMiddleware
);

export default publicPracticeRouter;
