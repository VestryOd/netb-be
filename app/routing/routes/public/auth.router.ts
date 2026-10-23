import * as express from "express";
import { createValidator } from "express-joi-validation";
import { errorHandlerMiddleware } from "@/middlewares";
import { SubRoutes } from "@/common/constants";
import { login, refreshToken } from "@/controllers/auth.controller";
import { authBodyValidator, userRequestSchema } from "../../validators";
import { addNewUserHandler } from "@/controllers";

const authRouter = express.Router();
const validator = createValidator({ passError: true });
/**
 * @swagger
 * /auth/login:
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: User is not exist
 *       401:
 *        description: Unauthorized
 */
authRouter.post(
  SubRoutes.Login,
  validator.body(authBodyValidator),
  login as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh user's token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/PermissionDeniedError'
 */
authRouter.post(
  SubRoutes.RefreshToken,
  refreshToken as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Create a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 required: true
 *                 example: John Dou
 *                 minLength: 5
 *                 maxLength: 100
 *               user_email:
 *                 type: string
 *                 required: true
 *                 format: email
 *                 example: john@email.com
 *                 pattern: '/^[\w_.]+@([\w-]+\.)+[\w-]{2,4}$/'
 *               user_password:
 *                 type: string
 *                 required: true
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: User with email {user.user_email} is already exist
 */
authRouter.post(
  SubRoutes.SignUp,
  validator.body(userRequestSchema),
  addNewUserHandler as express.RequestHandler,
  errorHandlerMiddleware
);

export default authRouter;
