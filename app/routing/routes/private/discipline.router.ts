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
const validator = createValidator();

protectedDisciplineHandleRouter.get(
  SubRoutes.GetAll,
  getAllDisciplines as express.RequestHandler,
  errorHandlerMiddleware
);

protectedDisciplineHandleRouter.post(
  SubRoutes.Root,
  validator.body(disciplineRequestSchema),
  addNewDiscipline as express.RequestHandler,
  errorHandlerMiddleware
);

protectedDisciplineHandleRouter.delete(
  `${SubRoutes.Root}/:disciplineId`,
  validator.params(disciplineParamsSchema),
  deleteDiscipline as express.RequestHandler,
  errorHandlerMiddleware
);

protectedDisciplineHandleRouter.put(
  `${SubRoutes.Root}/:disciplineId`,
  validator.params(disciplineParamsSchema),
  validator.body(disciplineRequestSchema),
  updateDiscipline as express.RequestHandler,
  errorHandlerMiddleware
);
