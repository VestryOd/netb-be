export interface IPractice {
  _id?: string;
  discipline?: string;
  code: string;
  answers: string[];
  right_answer: number[];
  details?: string;
  created_at: Date;
  created_by: string;
}
