import { Request, Response, NextFunction } from "express";
import StatusCodes from "http-status-codes";
import {
  theoryAllHandler,
  theoryOneHandler,
  createNewTheory,
  deleteOneTheory,
  updateOneTheory,
} from "@/services";

export const getAllTheoryItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const theoryItems = await theoryAllHandler();
    res.send(theoryItems);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getOneTheoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { theory_id } = req.params;
  try {
    const theoryItem = await theoryOneHandler(theory_id);
    res.statusCode = theoryItem ? StatusCodes.OK : StatusCodes.NOT_FOUND;
    res.send(theoryItem);
  } catch (err) {
    next(err);
  }
};

export const createTheoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const theoryItem = await createNewTheory(req.body);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = StatusCodes.CREATED;
    res.send(JSON.stringify(theoryItem));
  } catch (err) {
    next(err);
  }
};

export const deleteTheoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { theory_id } = req.params;
  try {
    const cleared = await deleteOneTheory(theory_id);
    res.statusCode = cleared ? StatusCodes.ACCEPTED : StatusCodes.NOT_FOUND;
    res.send(cleared);
  } catch (err) {
    next(err);
  }
};

export const updateTheoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { theory_id } = req.params;
  try {
    const updated = await updateOneTheory(theory_id, req.body);
    res.statusCode = StatusCodes.OK;
    res.send(updated);
  } catch (err) {
    next(err);
  }
};
