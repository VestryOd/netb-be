import { ITheoryService } from "@/common/interfaces";
import { TheoryModels } from "./models";

export const getAll = async ({ discipline }: ITheoryService) => {
  return await TheoryModels[discipline].find({});
};

export const getById = async ({ discipline, theory_id }: ITheoryService) =>
  await TheoryModels[discipline].findById(theory_id);

export const createOne = async ({ discipline, body }: ITheoryService) => {
  const newTheory = new TheoryModels[discipline](body);
  await newTheory.save();
  return newTheory;
};

export const updateOne = async ({
  discipline,
  theory_id,
  body,
}: ITheoryService) => {
  const exist = await TheoryModels[discipline].findById(theory_id);
  if (!exist) return null;

  Object.entries(body).forEach(([key, value]) => {
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
