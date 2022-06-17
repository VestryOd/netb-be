import { theoryDb } from "./theoryDB";
import { ITheory } from "@/common/interfaces/ITheory";
import { TheoryModel } from "./models/Theory.model";

let DB = theoryDb;

export const getAll = async () => Promise.resolve(DB);

export const getById = async (id: string) =>
  Promise.resolve(DB.find((el: any) => el.id === id));

export const createOne = async (options: Omit<ITheory, "id">) => {
  const theory = new TheoryModel(options);
  DB = [theory, ...DB];
  return Promise.resolve(DB);
};

export const deleteOne = async (id: string) => {
  const filtered = DB.filter((theory) => theory.id !== id);
  return Promise.resolve(filtered);
};
