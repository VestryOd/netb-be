import { Request, Response, NextFunction } from "express";
import { theoryAllHandler, theoryOneHandler } from "@/services";
import { createNewTheory } from "../db/local";

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

export const createTheoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const theoryItem = await createNewTheory(req.body);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 201;
    res.send(JSON.stringify(theoryItem));
  } catch (err) {
    next(err);
  }
};
