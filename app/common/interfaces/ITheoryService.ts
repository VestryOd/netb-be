import { ITheory } from "./ITheory";
import { FileArray } from "express-fileupload";

export interface ITheoryService {
  discipline: string;
  theory_id?: string;
  theory?: Omit<ITheory, "id"> | ITheory;
  files?: FileArray;
}
