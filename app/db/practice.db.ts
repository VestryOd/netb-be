import { IPracticeService } from "../common/interfaces";
import { PracticeModels } from "./models/practice.model";

export const getAll = async ({ discipline }: IPracticeService) =>
  await PracticeModels[discipline].find({});

export const getById = async ({ discipline, practice_id }: IPracticeService) =>
  await PracticeModels[discipline].findById(practice_id);

export const createOne = async ({ discipline, body }: IPracticeService) => {
  const newPractice = new PracticeModels[discipline](body);
  await newPractice.save();
  return newPractice;
};

export const deleteOne = async ({
  discipline,
  practice_id,
}: IPracticeService) => {
  const practice = await PracticeModels[discipline].findById(practice_id);

  if (!practice) return null;
  await practice.remove();
  return practice;
};

export const updateOne = async ({
  discipline,
  practice_id,
  body,
}: IPracticeService) => {
  const exist = await PracticeModels[discipline].findById(practice_id);

  if (!exist) return null;

  Object.entries(body).forEach(([key, value]) => {
    if (key) {
      exist[key] = value;
    }
  });
  exist.save();
  return exist;
};
