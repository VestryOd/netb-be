import { ITheory } from "./ITheory";

export interface ITheoryService {
  discipline: string;
  theory_id?: string;
  body?: Omit<ITheory, "id"> | ITheory;
}
