import { ITheoryService } from "@/common/interfaces";
import { TheoryModel } from "./models";

export const getAll = async ({ discipline }: ITheoryService) => {
  return TheoryModel.aggregate([{ $match: { discipline } }]);
};

export const getById = async ({ theory_id }: ITheoryService) =>
  await TheoryModel.findById(theory_id);

export const createOne = async ({ discipline, theory }: ITheoryService) => {
  // return TheoryModel.insertMany([{ ...theory, discipline }]);
  const newTheory = new TheoryModel({ ...theory, discipline });
  await newTheory.save();
  return newTheory;
};

export const updateOne = async ({
  discipline,
  theory_id,
  theory,
}: ITheoryService) => {
  // const exist = await TheoryModels[discipline].findById(theory_id);
  // if (!exist) return null;
  //
  // Object.entries(theory).forEach(([key, value]) => {
  //   if (key) {
  //     exist[key] = value;
  //   }
  // });
  // await exist.save();
  // return exist;

  return TheoryModel.updateOne({ _id: theory_id }, { ...theory, discipline });
};

export const deleteOne = async ({ discipline, theory_id }: ITheoryService) => {
  // const theory = await TheoryModels[discipline].findById(theory_id);
  // if (!theory) return null;
  //
  // await theory.remove();
  // return theory;
  return TheoryModel.findOneAndRemove({ _id: theory_id, discipline });
};
