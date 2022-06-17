import { getAll, getById, createOne, deleteOne } from "@/db/local";
import { ITheory } from "@/common/interfaces";

export const theoryAllHandler = async () => {
  return await getAll();
};

export const theoryOneHandler = async (id: string) => {
  return await getById(id);
};

export const createNewTheory = async (
  options: Omit<ITheory, "id">
): Promise<ITheory[]> => {
  return await createOne(options);
};

export const deleteOneTheory = async (id: string) => {
  return await deleteOne(id);
};
