import { Request, Response, NextFunction } from "express";
import StatusCodes from "http-status-codes";
import { TheoryService } from "@/services";

const theoryService = new TheoryService();

export const getAllTheoryItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { discipline } = req.params;
  try {
    const theoryItems = await theoryService.getAll({ discipline });
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
  const { theory_id, discipline } = req.params;
  try {
    const theoryItem = await theoryService.getOne({ discipline, theory_id });
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
  const { body } = req;
  const { discipline } = req.params;
  try {
    const theoryItem = await theoryService.createOne({
      discipline,
      theory: body,
    });
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
  const { theory_id, discipline } = req.params;
  try {
    const cleared = await theoryService.deleteOne({ discipline, theory_id });
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
  const { theory_id, discipline } = req.params;
  const { body, files } = req;
  try {
    const updated = await theoryService.updateOne({
      discipline,
      theory_id,
      theory: { ...body },
      files,
    });
    res.statusCode = StatusCodes.OK;
    res.send(updated);
  } catch (err) {
    next(err);
  }
};
