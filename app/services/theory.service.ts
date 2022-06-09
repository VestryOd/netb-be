import { getAll, getById } from "@/db/local";

export const theoryAllHandler = async () => {
  return await getAll();
};

export const theoryOneHandler = async (id: string) => {
  return await getById(id);
};
