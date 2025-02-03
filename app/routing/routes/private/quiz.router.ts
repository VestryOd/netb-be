import * as express from "express";
import { createValidator } from "express-joi-validation";
import { MainRoutes, QueryParams } from "@/common/constants";
import {
  createQuizHandler,
  updateQuizHandler,
  deleteQuizHandler,
  getQuizHandler,
  getAllQuizzes,
} from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";
import {
  quizCreateSchema,
  quizIdParamsSchema,
  quizUpdateSchema,
} from "@/routing/validators/quiz.validators";
import { parentParamSchema } from "@/common/validators";

const protectedQuizRouter = express.Router({ mergeParams: true });
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /{discipline}/quiz:
 *   get:
 *     summary: Get a list of quizzes
 *     description: Get a list of quizzes for the current user and certain discipline
 *     operationId: getAllQuizzes
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discipline
 *         required: true
 *         schema:
 *           type: string
 *         description: A discipline for which it's needed to create get quizzes
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum limit per page
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Number of page
 *       - in: query
 *         name: finished_only
 *         required: false
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Is it needed to include finished quizzes
 *     responses:
 *       200:
 *         description: The gotten list of quizzes will be returned
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Quiz'
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
protectedQuizRouter.get(
  MainRoutes.Root,
  validator.params(parentParamSchema),
  getAllQuizzes as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /{discipline}/quiz/{quiz_id}:
 *   get:
 *     summary: Get one quiz item
 *     description: Get a certain quiz item by provided id
 *     operationId: getQuiz
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discipline
 *         required: true
 *         schema:
 *           type: string
 *         description: A discipline for which it's needed to create get quizzes
 *       - in: path
 *         name: quiz_id
 *         required: true
 *         schema:
 *           type: string
 *         description: An id for a certain resource
 *     responses:
 *       200:
 *         description: The certain quiz will be returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
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
 *               quizIdNotFound:
 *                 $ref: '#/components/responses/NotFoundError'
 */
protectedQuizRouter.get(
  `${MainRoutes.Root}/:${QueryParams.QuizId}`,
  validator.params(quizIdParamsSchema),
  getQuizHandler as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /{discipline}/quiz:
 *   post:
 *     summary: Create a new quiz
 *     description: The new created quiz with tasks and questions will be returned
 *     operationId: createPostQuiz
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discipline
 *         required: true
 *         schema:
 *           type: string
 *         description: A discipline for which it's needed to create a new quiz
 *     requestBody:
 *       description: Create a new one quiz item from request body info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tasks_limit:
 *                 type: number
 *                 required: true
 *                 example: 10
 *               questions_limit:
 *                 type: number
 *     responses:
 *       200:
 *         description: A new created quiz will be returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
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
protectedQuizRouter.post(
  MainRoutes.Root,
  validator.params(parentParamSchema),
  validator.body(quizCreateSchema),
  createQuizHandler as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /{discipline}/quiz/{quiz_id}:
 *   patch:
 *     summary: Update an existing quiz
 *     description: One existing quiz will be updated with provided info
 *     operationId: updatePatchQuiz
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discipline
 *         required: true
 *         schema:
 *           type: string
 *         description: A discipline for which it's needed to update quiz
 *       - in: path
 *         name: quiz_id
 *         required: true
 *         schema:
 *           type: string
 *         description: An id for a certain resource
 *     requestBody:
 *       description: Update an existing quiz item from request body info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               override_answers:
 *                 type: boolean
 *                 required: true
 *                 example: false
 *               right:
 *                 type: array
 *                 items:
 *                   type: string
 *               wrong:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Updated quiz will be returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
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
 *               quizIdNotFound:
 *                 $ref: '#/components/responses/NotFoundError'
 */
protectedQuizRouter.patch(
  `${MainRoutes.Root}/:${QueryParams.QuizId}`,
  validator.params(quizIdParamsSchema),
  validator.body(quizUpdateSchema),
  updateQuizHandler as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /{discipline}/quiz/{quiz_id}:
 *   delete:
 *     summary: Delete an existing quiz
 *     description: One existing quiz will be deleted
 *     operationId: updatePatchQuiz
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discipline
 *         required: true
 *         schema:
 *           type: string
 *         description: A discipline for which it's needed to delete quiz
 *       - in: path
 *         name: quiz_id
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
 *               quizIdNotFound:
 *                 $ref: '#/components/responses/NotFoundError'
 */
protectedQuizRouter.delete(
  `${MainRoutes.Root}/:${QueryParams.QuizId}`,
  validator.params(quizIdParamsSchema),
  deleteQuizHandler as express.RequestHandler,
  errorHandlerMiddleware
);

export default protectedQuizRouter;
