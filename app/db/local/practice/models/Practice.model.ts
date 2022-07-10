import { v4 as uuidv4 } from "uuid";
import { IPractice } from "@/common/interfaces";

export class PracticeModel implements IPractice {
  id: string;
  p__code: string;
  p__answers: string[];
  p__right_answer: number;
  p__details: string;
  constructor({
    p__code,
    p__answers,
    p__right_answer,
    p__details = "",
  }: Omit<IPractice, "id">) {
    this.id = uuidv4();
    this.p__code = p__code;
    this.p__answers = p__answers;
    this.p__right_answer = p__right_answer;
    this.p__details = p__details;
  }
}
