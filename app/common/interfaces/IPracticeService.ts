import { IPractice } from "./IPractice";

export interface IPracticeService {
  discipline: string;
  limit?: string | number;
  skip?: string | number;
}

export interface IPracticeServiceItem extends IPracticeService {
  practice_id: string;
}

export interface IPracticeServiceCreate extends IPracticeService {
  body: Omit<IPractice, "id"> | IPractice;
  user_id: string;
}

export interface IPracticeServiceUpdate extends IPracticeServiceCreate {
  practice_id: string;
}
