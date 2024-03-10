import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import { parentParamSchema } from "@/common/validators";
import { getAllTheoryItems, getOneTheoryHandler } from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";
import { theoryIdParamsSchema } from "../../validators";

const publicTheoryRouter = express.Router({ mergeParams: true });
const validator = createValidator();

publicTheoryRouter.get(
  SubRoutes.Root,
  validator.params(parentParamSchema),
  getAllTheoryItems as express.RequestHandler,
  errorHandlerMiddleware
);

publicTheoryRouter.get(
  `${SubRoutes.Root}/:theory_id`,
  validator.params(theoryIdParamsSchema),
  getOneTheoryHandler as express.RequestHandler,
  errorHandlerMiddleware
);

export default publicTheoryRouter;
