import { Request, Response, NextFunction } from "express";
import StatusCodes from "http-status-codes";
import {
  practiceAllHandler,
  practiceOneHandler,
  createNewPractice,
  deleteOnePractice,
  updateOnePractice,
} from "@/services";
import { catchErrorHandler } from "@/common/helpers";
import { AuthService } from "../services/Auth.service";
import { NOT_FOUND } from "@/common/constants";

export const getAllPracticeItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { discipline } = req.params;
  try {
    const practiceItems = await practiceAllHandler({ discipline });
    res.send(practiceItems);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const getOnePracticeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { discipline, practice_id } = req.params;
  try {
    const practiceItem = await practiceOneHandler({ discipline, practice_id });
    res.statusCode = practiceItem ? StatusCodes.OK : StatusCodes.NOT_FOUND;
    res.send(practiceItem || NOT_FOUND(`User with id ${practice_id}`));
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const createPracticeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { discipline } = req.params;
  try {
    const user_id = AuthService.getUserIdFromToken(req);
    const practiceItem = await createNewPractice({
      discipline,
      body: req.body,
      user_id,
    });
    res.setHeader("Content-Type", "application/json");
    res.statusCode = StatusCodes.CREATED;
    res.send(JSON.stringify(practiceItem));
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const deletePracticeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { discipline, practice_id } = req.params;
  try {
    const cleared = await deleteOnePractice({ discipline, practice_id });
    res.statusCode = cleared ? StatusCodes.ACCEPTED : StatusCodes.NOT_FOUND;
    res.send(cleared || NOT_FOUND(`User with id ${practice_id}`));
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const updatePracticeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { discipline, practice_id } = req.params;
  try {
    const user_id = AuthService.getUserIdFromToken(req);
    const updated = await updateOnePractice({
      discipline,
      practice_id,
      body: req.body,
      user_id,
    });
    res.statusCode = updated ? StatusCodes.OK : StatusCodes.NOT_FOUND;
    res.send(updated || NOT_FOUND(`Practice with id ${practice_id}`));
  } catch (err) {
    catchErrorHandler(err, next);
  }
};
