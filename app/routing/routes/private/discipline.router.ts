import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import {
  disciplineParamsSchema,
  disciplineRequestSchema,
} from "../../validators";
import {
  addNewDiscipline,
  deleteDiscipline,
  getAllDisciplines,
  updateDiscipline,
} from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";

export const protectedDisciplineHandleRouter = express.Router({
  mergeParams: true,
});
const validator = createValidator({ passError: true });
/**
 * @swagger
 * /disciplines/get-all:
 *   get:
 *     summary: Get all existing disciplines
 *     description: Get all existing disciplines
 *     operationId: getDisciplines
 *     tags: [Discipline]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of disciplines items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Discipline'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/PermissionDeniedError'
 * */
protectedDisciplineHandleRouter.get(
  SubRoutes.GetAll,
  getAllDisciplines as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /disciplines:
 *   post:
 *     summary: Create a new discipline
 *     description: Create a new discipline
 *     operationId: postCreateDiscipline
 *     tags: [Discipline]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Create a new one discipline item from request body info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 example: Javascript
 *     responses:
 *       200:
 *         description: A new created disciplines item will be returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discipline'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/PermissionDeniedError'
 * */
protectedDisciplineHandleRouter.post(
  SubRoutes.Root,
  validator.body(disciplineRequestSchema),
  addNewDiscipline as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /disciplines/{discipline_id}:
 *   delete:
 *     summary: Delete a certain discipline
 *     description: Delete a certain discipline
 *     operationId: deleteDiscipline
 *     tags: [Discipline]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discipline_id
 *         required: true
 *         schema:
 *           type: string
 *         description: An id for a certain resource
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
 *               roleNotFound:
 *                 $ref: '#/components/responses/NotFoundError'
 * */
protectedDisciplineHandleRouter.delete(
  `${SubRoutes.Root}/:discipline_id`,
  validator.params(disciplineParamsSchema),
  deleteDiscipline as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /disciplines/{discipline_id}:
 *   put:
 *     summary: Update an existing discipline
 *     description: Update an existing discipline
 *     operationId: updateDiscipline
 *     tags: [Discipline]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discipline_id
 *         required: true
 *         schema:
 *           type: string
 *         description: An id for a certain resource
 *     requestBody:
 *       description: Create a new one discipline item from request body info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 example: Javascript
 *     responses:
 *       200:
 *         description: A new updated discipline item will be returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discipline'
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
 *               roleNotFound:
 *                 $ref: '#/components/responses/NotFoundError'
 * */
protectedDisciplineHandleRouter.put(
  `${SubRoutes.Root}/:discipline_id`,
  validator.params(disciplineParamsSchema),
  validator.body(disciplineRequestSchema),
  updateDiscipline as express.RequestHandler,
  errorHandlerMiddleware
);
