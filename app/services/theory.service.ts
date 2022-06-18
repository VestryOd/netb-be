import { getAll, getById, createOne, deleteOne, updateOne } from "@/db/local";
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

export const updateOneTheory = async (id: string, options: ITheory) => {
  return await updateOne(id, options);
};
