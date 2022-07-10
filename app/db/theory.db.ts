import { ITheory } from "@/common/interfaces";
import { Theory } from "./models";

export const getAll = async () => await Theory.find({});

export const getById = async (id: string) => await Theory.findById(id);

export const createOne = async (options: Omit<ITheory, "id">) => {
  const newTheory = new Theory(options);
  await newTheory.save();
  return newTheory;
};

export const updateOne = async (id: string, options: ITheory) => {
  const exist = await Theory.findById(id);
  if (!exist) return null;

  Object.entries(options).forEach(([key, value]) => {
    if (key) {
      exist[key] = value;
    }
  });
  await exist.save();
  return exist;
};

export const deleteOne = async (id: string) => {
  const theory = await Theory.findById(id);
  if (!theory) return null;

  await theory.remove();
  return theory;
};
