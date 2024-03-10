import { ITheory } from "./ITheory";
import { FileArray } from "express-fileupload";

export interface ITheoryService {
  discipline: string;
  theory_id: string;
  theory: ITheory;
  files: FileArray;
  user_id: string;
  limit?: string | number;
  skip?: string | number;
}
