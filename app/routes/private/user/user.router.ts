import * as express from "express";
import { createValidator } from "express-joi-validation";

const userRouter = express.Router({ mergeParams: true });
const validator = createValidator();

// userRouter.get();
