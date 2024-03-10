import { Request, Response, NextFunction } from "express";
import StatusCodes from "http-status-codes";
import { catchErrorHandler } from "@/common/helpers";
import { DisciplineService } from "@/services";

const disciplineService = new DisciplineService();

export const addNewDiscipline = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const created = await disciplineService.createOneDiscipline(name);
    res.statusCode = StatusCodes.CREATED;
    res.statusMessage = `Discipline with name ${name} was created`;
    res.send(created);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const getAllDisciplines = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const disciplines = await disciplineService.getAllDisciplines();
    res.statusCode = StatusCodes.OK;
    res.send(disciplines);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const deleteDiscipline = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { disciplineId } = req.params;
    const deleted = await disciplineService.deleteDiscipline(disciplineId);
    res.statusCode = deleted ? StatusCodes.ACCEPTED : StatusCodes.NOT_FOUND;
    res.send(deleted);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const updateDiscipline = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { disciplineId } = req.params;
    const { name } = req.body;
    const updatedDiscipline = await disciplineService.updateDiscipline({
      disciplineId,
      name,
    });
    res.statusCode = updatedDiscipline ? StatusCodes.OK : StatusCodes.NOT_FOUND;
    res.send(updatedDiscipline);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};
