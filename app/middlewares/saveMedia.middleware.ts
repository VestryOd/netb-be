import { Request, Response, NextFunction } from "express";
import { MediaService } from "../services/Media.service";

export const saveMediaMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    files,
    body,
    params: { discipline },
  } = req;

  if (files && Object.keys(files).length !== 0) {
    const mediaService = new MediaService();

    const updatedTheory = await mediaService.saveMediaAndUpdateTheory(
      discipline,
      body,
      files
    );
    req.body = { ...updatedTheory };
  }
  next();
};
