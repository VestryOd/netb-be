import { NextFunction, Request, Response } from "express";
import { DisciplineService } from "../services";

export const disciplineMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { discipline } = req.params;
    await DisciplineService.prototype.getDisciplineByName(discipline);
    return next();
  } catch (e) {
    res.send(e);
  }
};
