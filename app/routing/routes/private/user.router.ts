import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import {
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  updateUserRole,
} from "@/controllers";
import { errorHandlerMiddleware, authMiddlewareByRole } from "@/middlewares";
import { RolesEnum } from "@/common/enums";
import {
  userParamsSchema,
  userRequestSchema,
  userRoleRequestSchema,
} from "../../validators";

export const protectedUserRouter = express.Router({ mergeParams: true });
const validator = createValidator({ passError: true });
/**
 * @swagger
 * /user/get-all:
 *   get:
 *     summary: Get a list of all existing users
 *     description: Get a list of all existing users
 *     operationId: getUsersList
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of existing users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/PermissionDeniedError'
 * */
protectedUserRouter.get(
  SubRoutes.GetAll,
  authMiddlewareByRole[RolesEnum.ADMIN],
  getAllUsersHandler as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /user/{user_id}:
 *   get:
 *     summary: Get data of certain user by given id
 *     description: Get data of certain user by given id
 *     operationId: getUsersById
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: An id for certain user
 *     responses:
 *       200:
 *         description: User data by given user id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/BadRequestByIdError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/PermissionDeniedError'
 *       404:
 *         description: Entity was not found
 *         content:
 *           application/json:
 *             examples:
 *               userIdNotFound:
 *                 $ref: '#/components/responses/NotFoundError'
 * */
protectedUserRouter.get(
  `${SubRoutes.Root}/:user_id`,
  authMiddlewareByRole[RolesEnum.USER],
  validator.params(userParamsSchema),
  getUserByIdHandler as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /user/delete-user/{user_id}:
 *   delete:
 *     summary: Delete an existing user by given id
 *     description: Delete an existing user by given id
 *     operationId: deleteUser
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: An id for certain user
 *     responses:
 *       202:
 *         description: Successfully deleted
 *       400:
 *         $ref: '#/components/responses/BadRequestByIdError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/PermissionDeniedError'
 *       404:
 *         description: Entity was not found
 *         content:
 *           application/json:
 *             examples:
 *               userIdNotFound:
 *                 $ref: '#/components/responses/NotFoundError'
 * */
protectedUserRouter.delete(
  `${SubRoutes.DeleteUser}/:user_id`,
  authMiddlewareByRole[RolesEnum.USER],
  validator.params(userParamsSchema),
  deleteUserHandler as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /user/update-user/{user_id}:
 *   put:
 *     summary: Update an existing user by given id
 *     description: Update an existing user by given id
 *     operationId: updateUser
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: An id for certain user
 *     requestBody:
 *       description: Update an existing user from request body info
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
 *       200:
 *         description: An updated user will be returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/BadRequestByIdError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/PermissionDeniedError'
 *       404:
 *         description: Entity was not found
 *         content:
 *           application/json:
 *             examples:
 *               userIdNotFound:
 *                 $ref: '#/components/responses/NotFoundError'
 * */
protectedUserRouter.put(
  `${SubRoutes.UpdateUser}/:user_id`,
  authMiddlewareByRole[RolesEnum.USER],
  validator.params(userParamsSchema),
  validator.body(userRequestSchema),
  updateUserHandler as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /user/update-role/{user_id}:
 *   patch:
 *     summary: Update role in the existing user by given id
 *     description: Update role in the existing user by given id
 *     operationId: updateUserRole
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: An id for certain user
 *     requestBody:
 *       description: Update user role in existing user account from request body info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_role:
 *                 type: string
 *                 required: true
 *                 example: user
 *                 $ref: '#/components/schemas/RoleTypes'
 *     responses:
 *       200:
 *         description: An updated user with a new role will be returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/BadRequestByIdError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/PermissionDeniedError'
 *       404:
 *         description: Entity was not found
 *         content:
 *           application/json:
 *             examples:
 *               userIdNotFound:
 *                 $ref: '#/components/responses/NotFoundError'
 * */
protectedUserRouter.patch(
  `${SubRoutes.UpdateRole}/:user_id`,
  authMiddlewareByRole[RolesEnum.ADMIN],
  validator.params(userParamsSchema),
  validator.body(userRoleRequestSchema),
  updateUserRole as express.RequestHandler,
  errorHandlerMiddleware
);
