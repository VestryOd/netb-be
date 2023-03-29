import {
  IPracticeService,
  IPracticeServiceCreate,
  IPracticeServiceItem,
  IPracticeServiceUpdate,
} from "../common/interfaces";
import { PracticeModel } from "./models";

export const getAll = async ({ discipline }: IPracticeService) =>
  await PracticeModel.aggregate([{ $match: { discipline } }]);

export const getById = async ({ practice_id }: IPracticeServiceItem) => {
  return PracticeModel.findById(practice_id);
};

export const createOne = async ({
  discipline,
  body,
  user_id,
}: IPracticeServiceCreate) => {
  const created = {
    ...body,
    discipline,
    created_at: new Date(),
    created_by: user_id,
  };

  const newPractice = new PracticeModel(created);
  await newPractice.save();
  return newPractice;
};

export const deleteOne = async ({
  discipline,
  practice_id,
}: IPracticeServiceItem) => {
  return PracticeModel.findOneAndRemove({ _id: practice_id, discipline });
};

export const updateOne = async ({
  discipline,
  practice_id,
  body,
  user_id,
}: IPracticeServiceUpdate) => {
  const updated = {
    ...body,
    discipline,
    updated_at: new Date(),
    updated_by: user_id,
  };
  return PracticeModel.findByIdAndUpdate(practice_id, updated, { new: true });
};
