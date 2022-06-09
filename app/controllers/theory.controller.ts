import { Request, Response, NextFunction } from "express";
import { theoryAllHandler, theoryOneHandler } from "@/services";

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
    res.send(theoryItem);
  } catch (err) {
    next(err);
  }
};
