import { IPracticeService } from "../common/interfaces";
import { PracticeModel } from "./models";

export const getAll = async ({ discipline }: IPracticeService) =>
  await PracticeModel.aggregate([{ $match: { discipline } }]);

export const getById = async ({ discipline, practice_id }: IPracticeService) =>
  await PracticeModel.aggregate([{ $match: { discipline, _id: practice_id } }]);

export const createOne = async ({ discipline, body }: IPracticeService) => {
  return PracticeModel.insertMany([{ ...body, discipline }]);
  // const newPractice = new PracticeModel({ ...body, discipline });
  // await newPractice.save();
  // return newPractice;
};

export const deleteOne = async ({
  discipline,
  practice_id,
}: IPracticeService) => {
  // const practice = await PracticeModel.findById(practice_id);

  return PracticeModel.findOneAndRemove({ _id: practice_id, discipline });

  // if (!practice) return null;
  // await practice.remove();
  // return practice;
};

export const updateOne = async ({
  discipline,
  practice_id,
  body,
}: IPracticeService) => {
  // const exist = await PracticeModels[discipline].findById(practice_id);
  //
  // if (!exist) return null;
  //
  // Object.entries(body).forEach(([key, value]) => {
  //   if (key) {
  //     exist[key] = value;
  //   }
  // });
  // exist.save();
  // return exist;
  return PracticeModel.updateOne({ _id: practice_id }, { ...body, discipline });
};
