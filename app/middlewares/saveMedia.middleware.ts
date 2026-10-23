import { Request, Response, NextFunction } from "express";
import { MediaService } from "../services/Media.service";
import { NOT_FOUND } from "../common/constants";

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

    try {
      const updatedTheory = await mediaService.saveMediaAndUpdateTheory(
        discipline,
        body,
        files
      );
      req.body = { ...updatedTheory };
    } catch (e) {
      return next(e);
    }
  } else if (files === null) {
    const error = NOT_FOUND("Media files");
    res.statusCode = error.status;
    res.send(error);
  }
  next();
};
