import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import { authMiddlewareByRole, errorHandlerMiddleware } from "@/middlewares";
import { RolesEnum } from "@/common/enums";
import {
  addNewRoleHandler,
  getAllRolesHandler,
  removeRoleHandler,
} from "@/controllers";
import { roleParamsSchema, roleRequestSchema } from "@/routing/validators";

export const protectedRoleRouter = express.Router({ mergeParams: true });
const validator = createValidator({ passError: true });
/**
 * @swagger
 * /role/get-all:
 *   get:
 *     summary: Get all existing roles
 *     description: Get all existing roles
 *     operationId: getRoles
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of theoretical materials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/PermissionDeniedError'
 * */
protectedRoleRouter.get(
  SubRoutes.GetAll,
  authMiddlewareByRole[RolesEnum.ADMIN],
  getAllRolesHandler as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /role/{role_id}:
 *   delete:
 *     summary: Delete a certain role by role_id
 *     description: Delete a certain role by role_id
 *     operationId: deleteRoleById
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: role_id
 *         required: true
 *         schema:
 *           type: string
 *         description: An id for a certain resource
 *     responses:
 *       202:
 *         description: Successfully deleted
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/PermissionDeniedError'
 *       404:
 *         description: Entity was not found
 *         content:
 *           application/json:
 *             examples:
 *               roleNotFound:
 *                 $ref: '#/components/responses/NotFoundError'
 * */
protectedRoleRouter.delete(
  `${SubRoutes.Root}/:role_id`,
  validator.params(roleParamsSchema),
  authMiddlewareByRole[RolesEnum.ADMIN],
  removeRoleHandler as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /role:
 *   post:
 *     summary: Create a new one role
 *     description: Create a new one role
 *     operationId: postCreateRole
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Create a new one role item from request body info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 minLength: 2
 *                 example: 'user'
 *               access_level:
 *                 type: number
 *                 required: true
 *                 example: 0
 *     responses:
 *       200:
 *         description: A new created role will be returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/PermissionDeniedError'
 * */
protectedRoleRouter.post(
  SubRoutes.Root,
  validator.body(roleRequestSchema),
  authMiddlewareByRole[RolesEnum.ADMIN],
  addNewRoleHandler as express.RequestHandler,
  errorHandlerMiddleware
);
