import { Types } from "mongoose";
import { IPractice } from "@/common/interfaces/IPractice";
import { ITheory } from "@/common/interfaces/ITheory";

export interface IQuizAnsweredQuestions {
  right: string[];
  wrong: string[];
}

export interface IQuizResponse {
  _id?: string;
  discipline: string;
  tasks: IPractice[];
  questions: ITheory[];
  answered_questions: IQuizAnsweredQuestions;
  done: boolean;
  updated_at?: Date;
  created_at?: Date;
  created_by?: Types.ObjectId;
}

export interface CreateQuizPayload {
  discipline: string;
  user_id: string;
  tasks_limit?: number;
  questions_limit?: number;
}

export interface UpdateQuizPayloadData {
  right?: string[];
  wrong?: string[];
}

export interface UpdateQuizPayload {
  quiz_id: string;
  user_id: string;
  payload: UpdateQuizPayloadData;
  override_answers: boolean;
}

export interface DeleteQuiz {
  quiz_id: string;
  user_id: string;
}

export interface GetQuiz {
  quiz_id: string;
  user_id: string;
  discipline: string;
}

export interface GetAllQuizzes {
  user_id: string;
  discipline: string;
  skip: number;
  limit: number;
  finished_only?: boolean;
}
