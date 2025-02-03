import {
  CreateQuizPayload,
  DeleteQuiz,
  GetAllQuizzes,
  GetQuiz,
  IQuizResponse,
  UpdateQuizPayload,
} from "@/common/interfaces";
import {
  createQuiz,
  deleteQuiz,
  updateQuiz,
  getQuiz,
  getAllQuizzes,
} from "@/db/quiz.db";

export class QuizService {
  public async getAllQuizzes({
    discipline,
    limit,
    skip,
    finished_only,
    user_id,
  }: GetAllQuizzes): Promise<IQuizResponse[]> {
    return await getAllQuizzes({
      discipline,
      limit,
      skip,
      finished_only,
      user_id,
    });
  }

  public async getQuiz({
    discipline,
    quiz_id,
    user_id,
  }: GetQuiz): Promise<IQuizResponse[]> {
    return await getQuiz({ discipline, quiz_id, user_id });
  }

  public async makeQuiz({
    discipline,
    user_id,
    tasks_limit = 10,
    questions_limit = 0,
  }: CreateQuizPayload): Promise<IQuizResponse> {
    return createQuiz({
      discipline,
      user_id,
      tasks_limit,
      questions_limit,
    });
  }

  public async updateQuiz({
    quiz_id,
    payload,
    override_answers,
    user_id,
  }: UpdateQuizPayload): Promise<IQuizResponse> {
    return updateQuiz({
      quiz_id,
      payload,
      override_answers,
      user_id,
    });
  }

  public async deleteQuiz({ quiz_id, user_id }: DeleteQuiz): Promise<string> {
    return deleteQuiz({ quiz_id, user_id });
  }
}
