import * as express from "express";
import { createValidator } from "express-joi-validation";
import { errorHandlerMiddleware } from "@/middlewares";
import { SubRoutes } from "@/common/constants";
import { login } from "@/controllers/auth.controller";
import { authBodyValidator } from "../../validators/auth.validators";

const authRouter = express.Router();
const validator = createValidator();

authRouter.post(
  SubRoutes.Root,
  validator.body(authBodyValidator),
  login as express.RequestHandler,
  errorHandlerMiddleware
);

export default authRouter;
