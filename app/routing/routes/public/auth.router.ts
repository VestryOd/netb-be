import * as express from "express";
import { createValidator } from "express-joi-validation";
import { errorHandlerMiddleware } from "@/middlewares";
import { SubRoutes } from "@/common/constants";
import { login } from "@/controllers/auth.controller";
import { authBodyValidator } from "../../validators";

const authRouter = express.Router();
const validator = createValidator();
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: User is not exist
 *       401:
 *        description: Unauthorized
 */
authRouter.post(
  SubRoutes.Root,
  validator.body(authBodyValidator),
  login as express.RequestHandler,
  errorHandlerMiddleware
);

export default authRouter;
