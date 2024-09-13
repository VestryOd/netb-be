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
 *     summary: Регистрация нового пользователя
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Успешная регистрация
 *       400:
 *         description: Ошибка валидации данных
 */
publicUserRouter.post(
  SubRoutes.Root,
  validator.body(userRequestSchema),
  addNewUserHandler as express.RequestHandler,
  errorHandlerMiddleware
);

export default publicUserRouter;
