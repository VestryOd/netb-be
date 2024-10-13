import * as express from "express";
import { createValidator } from "express-joi-validation";
import { SubRoutes } from "@/common/constants";
import { parentParamSchema } from "@/common/validators";
import { getAllTheoryItems, getOneTheoryHandler } from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";
import { theoryIdParamsSchema } from "../../validators";

const publicTheoryRouter = express.Router({ mergeParams: true });
const validator = createValidator({ passError: true });
/**
 * @swagger
 * /{discipline}/theory:
 *   get:
 *     summary: Get the full list of theory materials
 *     description: Get all theory materials, using pagination
 *     operationId: getAllTheory
 *     tags: [Theory]
 *     parameters:
 *       - in: path
 *         name: discipline
 *         required: true
 *         schema:
 *           type: string
 *         description: A discipline for which it's needed to get theoretical materials
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
 *         description: A list of theoretical materials
 *         content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Theory'
 */
publicTheoryRouter.get(
  SubRoutes.Root,
  validator.params(parentParamSchema),
  getAllTheoryItems as express.RequestHandler,
  errorHandlerMiddleware
);
/**
 * @swagger
 * /{discipline}/theory/{theory_id}:
 *   get:
 *     summary: Get a certain theory material by theory_id
 *     description: Get a certain theory material by theory_id
 *     operationId: getOneTheory
 *     tags: [Theory]
 *     parameters:
 *       - in: path
 *         name: discipline
 *         required: true
 *         schema:
 *           type: string
 *         description: A discipline for which it's needed to get theoretical materials
 *       - in: path
 *         name: theory_id
 *         required: true
 *         schema:
 *           type: string
 *         description: An id for certain material
 *     responses:
 *       200:
 *         description: A certain theory material by id will be given
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Theory'
 *       400:
 *         description: Bad request, provided {theory_id} is not in correct format
 *       404:
 *         description: Theory with id {theory_id} not found
 * */
publicTheoryRouter.get(
  `${SubRoutes.Root}/:theory_id`,
  validator.params(theoryIdParamsSchema),
  getOneTheoryHandler as express.RequestHandler,
  errorHandlerMiddleware
);

export default publicTheoryRouter;
