import {
  IPracticeService,
  IPracticeServiceCreate,
  IPracticeServiceItem,
  IPracticeServiceUpdate,
} from "../common/interfaces";
import { PracticeModel } from "./models";
import {
  aggregateQuery,
  NOT_FOUND,
  SchemaNames,
  entityNotFoundMessage,
} from "@/common/constants";

export const getAll = async ({ discipline, limit, skip }: IPracticeService) => {
  const query = aggregateQuery({
    discipline,
    schemaName: SchemaNames.Practice,
    limit,
    skip,
  });
  // @ts-ignore
  return PracticeModel.aggregate(query);
};

export const getById = async ({
  practice_id,
  discipline,
}: IPracticeServiceItem) => {
  const query = aggregateQuery({
    discipline,
    schemaName: SchemaNames.Practice,
    id: practice_id,
  });
  // @ts-ignore
  const aggregateResult = await PracticeModel.aggregate(query);
  if (!aggregateResult?.length)
    throw NOT_FOUND(entityNotFoundMessage(practice_id, SchemaNames.Practice));

  return aggregateResult;
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
