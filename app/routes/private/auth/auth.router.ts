import * as express from "express";
import { createValidator } from "express-joi-validation";
import { errorHandlerMiddleware } from "@/middlewares";
import { SubRoutes } from "@/common/constants";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { authBodyValidator } from "./auth.validators";

const authRouter = express.Router();
const validator = createValidator();

authRouter.post(
  SubRoutes.Login,
  validator.body(authBodyValidator),
  authMiddleware,
  errorHandlerMiddleware
);
