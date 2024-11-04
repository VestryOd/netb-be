import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import {
  createTheoryHandler,
  deleteTheoryHandler,
  updateTheoryHandler,
} from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";
import {
  theoryIdParamsSchema,
  theoryObjectRequestSchema,
} from "../../validators";
import { parentParamSchema } from "@/common/validators";
import { customBodyParseMiddleware } from "@/middlewares";
import { saveMediaMiddleware } from "@/middlewares/saveMedia.middleware";

const protectedTheoryRouter = express.Router({ mergeParams: true });
const validator = createValidator({ passError: true });
/**
 * @swagger
 * /{discipline}/theory:
 *   post:
 *     summary: Create one theory item
 *     description: Create one theory item
 *     operationId: postCreateTheory
 *     tags: [Theory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discipline
 *         required: true
 *         schema:
 *           type: string
 *         description: A discipline for which it's needed to create theoretical materials
 *     requestBody:
 *       description: Create a new one theory item from request body info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: true
 *                 example: Some question
 *               links:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     resource_name:
 *                       type: string
 *                       required: true
 *                     url:
 *                       type: string
 *                       required: true
 *                     title:
 *                       type: ['null', string]
 *                 example: []
 *               content:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   $ref: '#/components/schemas/Content'
 *     responses:
 *       200:
 *         description: A new created theory will be returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Theory'
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
 *               mediaFilesNotFound:
 *                 $ref: '#/components/responses/MediaFilesNotFoundError'
 */
protectedTheoryRouter.post(
  SubRoutes.Root,
  customBodyParseMiddleware,
  saveMediaMiddleware,
  validator.params(parentParamSchema),
  validator.body(theoryObjectRequestSchema),
  createTheoryHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /{discipline}/theory/{theory_id}:
 *   delete:
 *     summary: Delete one theory item
 *     description: Delete one theory item
 *     operationId: deleteTheory
 *     tags: [Theory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discipline
 *         required: true
 *         schema:
 *           type: string
 *         description: A discipline for which it's needed to delete theoretical materials
 *       - in: path
 *         name: theory_id
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
 *               theoryIdNotFound:
 *                 $ref: '#/components/responses/NotFoundError'
 */
protectedTheoryRouter.delete(
  `${SubRoutes.Root}/:theory_id`,
  validator.params(theoryIdParamsSchema),
  deleteTheoryHandler as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /{discipline}/theory/{theory_id}:
 *   put:
 *     summary: Update an existing theory item
 *     description: Update an existing theory item
 *     operationId: putUpdateTheory
 *     tags: [Theory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discipline
 *         required: true
 *         schema:
 *           type: string
 *         description: A discipline for which it's needed to update theoretical materials
 *       - in: path
 *         name: theory_id
 *         required: true
 *         schema:
 *           type: string
 *         description: An id for a certain resource
 *     requestBody:
 *       description: Update an existing theory item from request body info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: true
 *                 example: Some question
 *               links:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     resource_name:
 *                       type: string
 *                       required: true
 *                     url:
 *                       type: string
 *                       required: true
 *                     title:
 *                       type: ['null', string]
 *                 example: []
 *               content:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   $ref: '#/components/schemas/Content'
 *     responses:
 *       200:
 *         description: An updated theory item will be returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Theory'
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
 *               mediaFilesNotFound:
 *                 $ref: '#/components/responses/MediaFilesNotFoundError'
 *               theoryIdNotFound:
 *                 $ref: '#/components/responses/NotFoundError'
 */
protectedTheoryRouter.put(
  `${SubRoutes.Root}/:theory_id`,
  customBodyParseMiddleware,
  saveMediaMiddleware,
  validator.params(theoryIdParamsSchema),
  validator.body(theoryObjectRequestSchema),
  updateTheoryHandler as express.RequestHandler,
  errorHandlerMiddleware
);

export default protectedTheoryRouter;
