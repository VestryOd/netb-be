import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import { parentParamSchema } from "@/common/validators";
import { getAllPracticeItems, getOnePracticeHandler } from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";
import { practiceIdParamsSchema } from "../../validators";

const publicPracticeRouter = express.Router({ mergeParams: true });
const validator = createValidator({ passError: true });
/**
 * @swagger
 * /{discipline}/practice:
 *   get:
 *     summary: Get the full list of practice tasks
 *     description: Get the full list of practice tasks, using pagination
 *     operationId: getAllPractice
 *     tags: [Practice]
 *     parameters:
 *       - in: path
 *         name: discipline
 *         required: true
 *         schema:
 *           type: string
 *         description: A discipline for which it's needed to get practice tasks
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
 *     responses:
 *       200:
 *         description: A list of practice tasks
 *         content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Practice'
 */
publicPracticeRouter.get(
  SubRoutes.Root,
  validator.params(parentParamSchema),
  getAllPracticeItems as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /{discipline}/practice/{practice_id}:
 *   get:
 *     summary: Get a certain practice task by practice_id
 *     description: Get a certain practice task by practice_id
 *     operationId: getOnePractice
 *     tags: [Practice]
 *     parameters:
 *       - in: path
 *         name: discipline
 *         required: true
 *         schema:
 *           type: string
 *         description: A discipline for which it's needed to get practice task
 *       - in: path
 *         name: theory_id
 *         required: true
 *         schema:
 *           type: string
 *         description: An id for certain practice task
 *     responses:
 *       200:
 *         description: A certain Practice task by id will be given
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Practice'
 *       400:
 *         description: Bad request, provided {practice_id} is not in correct format
 *       404:
 *         description: Practice with id {practice_id} not found
 * */
publicPracticeRouter.get(
  `${SubRoutes.Root}/:practice_id`,
  validator.params(practiceIdParamsSchema),
  getOnePracticeHandler as express.RequestHandler,
  errorHandlerMiddleware
);

export default publicPracticeRouter;
