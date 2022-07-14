import { ITheory, ITheoryService } from "@/common/interfaces";
import {
  createOne,
  updateOne,
  getById,
  getAll,
  deleteOne,
} from "../db/theory.db";

export const theoryAllHandler = async ({ discipline }: ITheoryService) => {
  return await getAll({ discipline });
};

export const theoryOneHandler = async ({
  discipline,
  theory_id,
}: ITheoryService) => {
  return await getById({ discipline, theory_id });
};

export const createNewTheory = async ({
  discipline,
  body,
}: ITheoryService): Promise<ITheory> => {
  return await createOne({ discipline, body });
};

export const deleteOneTheory = async ({
  discipline,
  theory_id,
}: ITheoryService) => {
  return await deleteOne({ discipline, theory_id });
};

export const updateOneTheory = async ({
  discipline,
  theory_id,
  body,
}: ITheoryService) => {
  return await updateOne({ discipline, theory_id, body });
};
