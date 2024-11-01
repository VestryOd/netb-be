import * as express from "express";
import { createValidator } from "express-joi-validation";
import { errorHandlerMiddleware } from "@/middlewares";
import { SubRoutes } from "@/common/constants";
import { login } from "@/controllers/auth.controller";
import { authBodyValidator } from "../../validators";

const authRouter = express.Router();
const validator = createValidator({ passError: true });
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
 *               user_email:
 *                 type: string
 *                 format: email
 *                 example: john@email.com
 *                 pattern: '/^[\w_.]+@([\w-]+\.)+[\w-]{2,4}$/'
 *               user_password:
 *                 type: string
 *                 required: true
 *                 minLength: 6
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
