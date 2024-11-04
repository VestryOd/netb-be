import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import {
  createPracticeHandler,
  deletePracticeHandler,
  updatePracticeHandler,
} from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";
import { parentParamSchema } from "@/common/validators";
import { practiceBasicSchema, practiceIdParamsSchema } from "../../validators";

const protectedPracticeRouter = express.Router({ mergeParams: true });
const validator = createValidator({ passError: true });
/**
 * @swagger
 * /{discipline}/practice:
 *   post:
 *     summary: Create one practice item
 *     description: Create one practice item
 *     operationId: postCreatePractice
 *     tags: [Practice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discipline
 *         required: true
 *         schema:
 *           type: string
 *         description: A discipline for which it's needed to create practical materials
 *     requestBody:
 *       description: Create a new one practice item from request body info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 minLength: 3
 *                 example: 'null == undefined'
 *               answers:
 *                 type: array
 *                 minItems: 2
 *                 required: true
 *                 items:
 *                   type: string
 *                 example: ['true', 'false', 'ReferenceError', 'undefined']
 *               right_answer:
 *                 type: array
 *                 required: true
 *                 items:
 *                   type: number
 *                 example: [1]
 *               details:
 *                 type: string
 *                 example: 'On coercion types, both null and undefined become false, so the answer will be true.'
 *     responses:
 *       200:
 *         description: A new created practice will be returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Practice'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/PermissionDeniedError'
 *       404:
 *         description: Entity was not found
 *         content:
 *           application/json:
 *             examples:
 *               disciplineNotFound:
 *                 $ref: '#/components/responses/DisciplineNotFoundError'
 */
protectedPracticeRouter.post(
  SubRoutes.Root,
  validator.params(parentParamSchema),
  validator.body(practiceBasicSchema),
  createPracticeHandler as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /{discipline}/practice/{practice_id}:
 *   delete:
 *     summary: Delete an existing practice item
 *     description: Delete an existing practice item
 *     operationId: deletePractice
 *     tags: [Practice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discipline
 *         required: true
 *         schema:
 *           type: string
 *         description: A discipline for which it's needed to delete practical materials
 *       - in: path
 *         name: practice_id
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
 *               disciplineNotFound:
 *                 $ref: '#/components/responses/DisciplineNotFoundError'
 *               practiceIdNotFound:
 *                 $ref: '#/components/responses/NotFoundError'
 */
protectedPracticeRouter.delete(
  `${SubRoutes.Root}/:practice_id`,
  validator.params(practiceIdParamsSchema),
  deletePracticeHandler as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /{discipline}/practice/{practice_id}:
 *   put:
 *     summary: Update an existing practice item
 *     description: Update an existing practice item
 *     operationId: putUpdatePractice
 *     tags: [Practice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discipline
 *         required: true
 *         schema:
 *           type: string
 *         description: A discipline for which it's needed to create practical materials
 *       - in: path
 *         name: practice_id
 *         required: true
 *         schema:
 *           type: string
 *         description: An id for a certain resource
 *     requestBody:
 *       description: Update an existing practice item from request body info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 minLength: 3
 *                 example: 'null == undefined'
 *               answers:
 *                 type: array
 *                 required: true
 *                 minItems: 2
 *                 items:
 *                   type: string
 *                 example: ['true', 'false', 'ReferenceError', 'undefined']
 *               right_answer:
 *                 type: array
 *                 required: true
 *                 items:
 *                   type: number
 *                 example: [1]
 *               details:
 *                 type: string
 *                 example: 'On coercion types, both null and undefined become false, so the answer will be true.'
 *     responses:
 *       200:
 *         description: An updated practice will be returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Practice'
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
 *               disciplineNotFound:
 *                 $ref: '#/components/responses/DisciplineNotFoundError'
 *               practiceIdNotFound:
 *                 $ref: '#/components/responses/NotFoundError'
 */
protectedPracticeRouter.put(
  `${SubRoutes.Root}/:practice_id`,
  validator.params(practiceIdParamsSchema),
  validator.body(practiceBasicSchema),
  updatePracticeHandler as express.RequestHandler,
  errorHandlerMiddleware
);

export default protectedPracticeRouter;
