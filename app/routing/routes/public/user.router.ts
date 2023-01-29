import * as express from "express";
import { createValidator } from "express-joi-validation";
import { userRequestSchema } from "../../validators/user.validators";
import { SubRoutes } from "@/common/constants";
import { addNewUserHandler } from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";

const publicUserRouter = express.Router();
const validator = createValidator();

publicUserRouter.post(
  SubRoutes.Root,
  validator.body(userRequestSchema),
  addNewUserHandler as express.RequestHandler,
  errorHandlerMiddleware
);

export default publicUserRouter;
