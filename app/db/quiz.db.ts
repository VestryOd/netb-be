/* eslint-disable */
import { QuizModel, TheoryModel, PracticeModel } from "./models";
import {
  CreateQuizPayload,
  DeleteQuiz,
  GetAllQuizzes,
  GetQuiz,
  IPractice,
  IQuizResponse,
  ITheory,
  UpdateQuizPayload,
} from "@/common/interfaces";
import {
  aggregateCreateQuizQuery,
  aggregateQuizQuery,
  entityNotFoundMessage,
  NOT_FOUND,
  SchemaNames,
  UNAUTHORIZED,
} from "@/common/constants";

type GenerateQuizItemsType = {
  discipline: string;
  limit: number;
};

export const getAllQuizzes = async ({
  discipline,
  user_id,
  skip,
  limit,
  finished_only = true,
}: GetAllQuizzes) => {
  const query = aggregateQuizQuery({
    discipline,
    limit,
    skip,
    schemaName: SchemaNames.Quiz,
    finished_only,
    user_id,
  });

  return QuizModel.aggregate(query);
};

export const getQuiz = async ({
  quiz_id,
  discipline,
  user_id,
}: GetQuiz): Promise<IQuizResponse[]> => {
  const query = aggregateQuizQuery({
    discipline,
    limit: 1,
    skip: 0,
    schemaName: SchemaNames.Quiz,
    user_id,
    quiz_id,
  });
  const quiz = await QuizModel.aggregate(query);

  if (!quiz?.length)
    throw NOT_FOUND(entityNotFoundMessage(quiz_id, SchemaNames.Quiz));

  return quiz;
};

const generateTasks = async ({
  discipline,
  limit,
}: GenerateQuizItemsType): Promise<IPractice[]> => {
  const query = aggregateCreateQuizQuery({
    discipline,
    limit,
    schemaName: SchemaNames.Practice,
  });
  return PracticeModel.aggregate(query);
};

const generateQuestions = async ({
  discipline,
  limit,
}: GenerateQuizItemsType): Promise<ITheory[]> => {
  if (!limit) {
    return Promise.resolve([]);
  }

  const query = aggregateCreateQuizQuery({
    discipline,
    limit,
    schemaName: SchemaNames.Theory,
  });
  return TheoryModel.aggregate(query);
};

export const createQuiz = async ({
  user_id,
  discipline,
  tasks_limit,
  questions_limit,
}: CreateQuizPayload): Promise<IQuizResponse> => {
  const [tasks, questions] = await Promise.all([
    await generateTasks({ discipline, limit: tasks_limit }),
    await generateQuestions({
      discipline,
      limit: questions_limit,
    }),
  ]);

  const quiz = new QuizModel({
    discipline,
    tasks,
    questions,
    created_by: user_id,
  });

  await quiz.save();
  return quiz;
};

export const updateQuiz = async ({
  quiz_id,
  payload,
  override_answers,
  user_id,
}: UpdateQuizPayload): Promise<IQuizResponse> => {
  const quiz: IQuizResponse = await QuizModel.findById(quiz_id);

  if (!quiz) {
    throw NOT_FOUND(entityNotFoundMessage(quiz_id, SchemaNames.Quiz));
  }

  if (quiz.created_by.toString() !== user_id) {
    throw UNAUTHORIZED();
  }

  quiz.answered_questions = override_answers
    ? {
        right: payload.right,
        wrong: payload.wrong,
      }
    : {
        right: Array.from(
          new Set([...quiz.answered_questions.right, ...payload.right])
        ),
        wrong: Array.from(
          new Set([...quiz.answered_questions.wrong, ...payload.wrong])
        ),
      };
  quiz.updated_at = new Date();

  if (
    quiz.answered_questions.right.length +
      quiz.answered_questions.wrong.length ===
    quiz.tasks.length
  ) {
    quiz.done = true;
  }

  return QuizModel.findByIdAndUpdate(quiz_id, { ...quiz }, { new: true });
};

export const deleteQuiz = async ({ quiz_id, user_id }: DeleteQuiz) => {
  const quiz = await QuizModel.findById(quiz_id);
  if (!quiz) {
    throw NOT_FOUND(entityNotFoundMessage(quiz_id, SchemaNames.Quiz));
  }

  if (quiz.created_by.toString() !== user_id) {
    throw UNAUTHORIZED();
  }

  return quiz.deleteOne();
};
