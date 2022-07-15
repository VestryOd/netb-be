import { IPractice } from "./IPractice";

export interface IPracticeService {
  discipline: string;
  practice_id?: string;
  body?: Omit<IPractice, "id"> | IPractice;
}
