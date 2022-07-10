import { Request, Response, NextFunction } from "express";
import StatusCodes from "http-status-codes";
import {
  practiceAllHandler,
  practiceOneHandler,
  createNewPractice,
  deleteOnePractice,
  updateOnePractice,
} from "@/services";

export const getAllPracticeItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const practiceItems = await practiceAllHandler();
    res.send(practiceItems);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getOnePracticeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { practice_id } = req.params;
  try {
    const practiceItem = await practiceOneHandler(practice_id);
    res.statusCode = practiceItem ? StatusCodes.OK : StatusCodes.NOT_FOUND;
    res.send(practiceItem);
  } catch (err) {
    next(err);
  }
};

export const createPracticeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const practiceItem = await createNewPractice(req.body);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = StatusCodes.CREATED;
    res.send(JSON.stringify(practiceItem));
  } catch (err) {
    next(err);
  }
};

export const deletePracticeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { practice_id } = req.params;
  try {
    const cleared = await deleteOnePractice(practice_id);
    res.statusCode = cleared ? StatusCodes.ACCEPTED : StatusCodes.NOT_FOUND;
    res.send(cleared);
  } catch (err) {
    next(err);
  }
};

export const updatePracticeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { practice_id } = req.params;
  try {
    const updated = await updateOnePractice(practice_id, req.body);
    res.statusCode = StatusCodes.OK;
    res.send(updated);
  } catch (err) {
    next(err);
  }
};
