import { NextFunction, Request, Response } from "express";
import { DisciplineService } from "@/services";
import { StatusCodes } from "http-status-codes";
import { MainRoutes } from "@/common/constants";

export const checkForValidDiscipline = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { discipline } = req.params;
    await DisciplineService.prototype.getDisciplineByName(discipline);
    return next();
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).send(e);
  }
};

export const disciplineMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    [MainRoutes.Role, MainRoutes.User, MainRoutes.Disciplines].includes(
      req.baseUrl as MainRoutes
    ) ||
    req.method !== "GET"
  ) {
    return next();
  }
  await checkForValidDiscipline(req, res, next);
};

export const protectedDisciplineMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    [MainRoutes.Role, MainRoutes.User, MainRoutes.Disciplines].includes(
      req.baseUrl as MainRoutes
    )
  ) {
    return next();
  }
  await checkForValidDiscipline(req, res, next);
};
