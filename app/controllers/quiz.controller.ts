import { Request, Response, NextFunction } from "express";
import StatusCodes from "http-status-codes";
import { catchErrorHandler } from "@/common/helpers";
import { QuizService } from "@/services";
import { AuthService } from "@/services/Auth.service";

const quizService = new QuizService();

export const getAllQuizzes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { discipline } = req.params;
  const { limit, page, finished_only } = req.query;
  try {
    const user_id = AuthService.getUserIdFromToken(req);
    const quizzes = await quizService.getAllQuizzes({
      discipline,
      user_id,
      finished_only: !!finished_only,
      limit: +limit,
      skip: (+page - 1) * +limit,
    });
    res.setHeader("Content-Type", "application/json");
    res.statusCode = StatusCodes.OK;
    res.send(quizzes);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const getQuizHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { discipline, quiz_id } = req.params;
  try {
    const user_id = AuthService.getUserIdFromToken(req);
    const [quiz] = await quizService.getQuiz({
      discipline,
      quiz_id,
      user_id,
    });
    res.setHeader("Content-Type", "application/json");
    res.statusCode = StatusCodes.OK;
    res.send(quiz);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const createQuizHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { discipline } = req.params;
  const { tasks_limit, questions_limit } = req.body;
  try {
    const user_id = AuthService.getUserIdFromToken(req);
    const quiz = await quizService.makeQuiz({
      discipline,
      user_id,
      tasks_limit: +tasks_limit,
      questions_limit: questions_limit ? +questions_limit : 0,
    });
    res.setHeader("Content-Type", "application/json");
    res.statusCode = StatusCodes.CREATED;
    res.send(quiz);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const updateQuizHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { quiz_id } = req.params;
  const { override_answers, right, wrong } = req.body;
  try {
    const user_id = AuthService.getUserIdFromToken(req);
    const updated = await quizService.updateQuiz({
      quiz_id,
      user_id,
      payload: { right, wrong },
      override_answers,
    });
    res.statusCode = StatusCodes.OK;
    res.send(updated);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const deleteQuizHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { quiz_id } = req.params;
  try {
    const user_id = AuthService.getUserIdFromToken(req);
    const cleared = await quizService.deleteQuiz({ quiz_id, user_id });
    res.statusCode = cleared ? StatusCodes.ACCEPTED : StatusCodes.NOT_FOUND;
    res.send(cleared ? quiz_id : null);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};
