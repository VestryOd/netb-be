export type PracticeAnswerType = {
  id: string;
  p__answer_text: string;
};

export interface IPractice {
  id: string;
  p__code: string;
  p__right_answer: string;
  p__answers: PracticeAnswerType[];
  p__details: string;
}
