import { theoryDb } from "./db";

export const getAll = async () => Promise.resolve([...theoryDb]);

export const getById = async (id: string) =>
  Promise.resolve(theoryDb.find((el: any) => el.id === id));
