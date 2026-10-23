import { SubRoutes } from "@/common/constants";
import { getAllDisciplines } from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";
import * as express from "express";

export const publicDisciplineHandleRouter = express.Router({
  mergeParams: true,
});
/**
 * @swagger
 * /disciplines/get-all:
 *   get:
 *     summary: Get all existing disciplines
 *     description: Get all existing disciplines
 *     operationId: getDisciplines
 *     tags: [Discipline]
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
publicDisciplineHandleRouter.get(
  SubRoutes.GetAll,
  getAllDisciplines as express.RequestHandler,
  errorHandlerMiddleware
);
