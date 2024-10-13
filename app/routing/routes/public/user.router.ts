import * as express from "express";
import { createValidator } from "express-joi-validation";
import { userRequestSchema } from "../../validators";
import { SubRoutes } from "@/common/constants";
import { addNewUserHandler } from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";

const publicUserRouter = express.Router();
const validator = createValidator();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API для управления пользователями
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *               user_email:
 *                 type: string
 *               user_password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Successfully created
 *       400:
 *         description: User with email {user.user_email} is already exist
 */
publicUserRouter.post(
  SubRoutes.Root,
  validator.body(userRequestSchema),
  addNewUserHandler as express.RequestHandler,
  errorHandlerMiddleware
);

export default publicUserRouter;
