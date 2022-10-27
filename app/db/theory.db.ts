import { ITheoryService } from "@/common/interfaces";
import { TheoryModels } from "./models";

export const getAll = async ({ discipline }: ITheoryService) => {
  return await TheoryModels[discipline].find({});
};

export const getById = async ({ discipline, theory_id }: ITheoryService) =>
  await TheoryModels[discipline].findById(theory_id);

export const createOne = async ({ discipline, theory }: ITheoryService) => {
  const newTheory = new TheoryModels[discipline](theory);
  await newTheory.save();
  return newTheory;
};

export const updateOne = async ({
  discipline,
  theory_id,
  theory,
}: ITheoryService) => {
  const exist = await TheoryModels[discipline].findById(theory_id);
  if (!exist) return null;

  Object.entries(theory).forEach(([key, value]) => {
    if (key) {
      exist[key] = value;
    }
  });
  await exist.save();
  return exist;
};

export const deleteOne = async ({ discipline, theory_id }: ITheoryService) => {
  const theory = await TheoryModels[discipline].findById(theory_id);
  if (!theory) return null;

  await theory.remove();
  return theory;
};
