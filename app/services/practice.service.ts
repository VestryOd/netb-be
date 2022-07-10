import {
  getAll,
  getById,
  createOne,
  deleteOne,
  updateOne,
} from "@/db/local/practice";
import { IPractice } from "@/common/interfaces";

export const practiceAllHandler = async () => {
  return await getAll();
};

export const practiceOneHandler = async (id: string) => {
  return await getById(id);
};

export const createNewPractice = async (options: Omit<IPractice, "id">) => {
  return await createOne(options);
};

export const deleteOnePractice = async (id: string) => {
  return await deleteOne(id);
};

export const updateOnePractice = async (id: string, options: IPractice) => {
  return await updateOne(id, options);
};
