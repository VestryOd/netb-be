import { practiceDB } from "./practiceDB";
import { IPractice } from "@/common/interfaces";
import { PracticeModel } from "./models";

let DB = practiceDB;

export const getAll = async () => Promise.resolve(DB);

export const getById = async (id: string) =>
  Promise.resolve(DB.find((el: any) => el.id === id));

export const createOne = async (options: Omit<IPractice, "id">) => {
  const practice = new PracticeModel(options);
  DB = [practice, ...DB];
  return Promise.resolve(DB);
};

export const deleteOne = async (id: string) => {
  const filtered = DB.filter((practice) => practice.id !== id);
  return Promise.resolve(filtered);
};

export const updateOne = async (id: string, options: IPractice) => {
  console.log("---updateOne", id);
  const cleared = await deleteOne(id);
  const practice = new PracticeModel(options);
  DB = [practice, ...cleared];
  return Promise.resolve(DB);
};
