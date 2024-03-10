import { ITheory, ITheoryRequest, ITheoryService } from "@/common/interfaces";
import { TheoryModel } from "./models";
import {
  NOT_FOUND,
  aggregateQuery,
  entityNotFoundMessage,
  SchemaNames,
} from "@/common/constants";
import { MongoIdType } from "@/common/types";

export const getAll = async ({
  discipline,
  limit,
  skip,
}: Partial<ITheoryService>) => {
  const query = aggregateQuery({
    discipline,
    schemaName: SchemaNames.Theory,
    limit,
    skip,
  });
  // @ts-ignore
  return TheoryModel.aggregate(query);
};

export const getById = async ({
  theory_id,
  discipline,
}: Partial<ITheoryService>): Promise<ITheory[]> => {
  const query = aggregateQuery({
    discipline,
    schemaName: SchemaNames.Theory,
    id: theory_id,
  });
  // @ts-ignore
  const aggregateResult = await TheoryModel.aggregate(query);
  if (!aggregateResult?.length)
    throw NOT_FOUND(entityNotFoundMessage(theory_id, SchemaNames.Theory));

  return aggregateResult;
};

export const checkExistenceTheory = async (theoryId: MongoIdType) => {
  const item = await TheoryModel.findById(theoryId);

  if (!item)
    throw NOT_FOUND(entityNotFoundMessage(theoryId, SchemaNames.Theory));
  return item;
};

export const createOne = async ({
  discipline,
  theory,
  user_id,
}: {
  discipline: string;
  theory: ITheoryRequest;
  user_id: string;
}) => {
  const newTheory = new TheoryModel({
    ...theory,
    discipline,
    created_by: user_id,
  });
  await newTheory.save();
  return newTheory;
};

export const updateOne = async ({
  theory_id,
  theory,
}: {
  theory_id: string;
  theory: ITheoryRequest;
}) => {
  return TheoryModel.findByIdAndUpdate(
    theory_id,
    {
      ...theory,
      updated_at: Date.now(),
    },
    { new: true }
  );
};

export const deleteOne = async ({
  discipline,
  theory_id,
}: Partial<ITheoryService>) => {
  return TheoryModel.findOneAndRemove({ _id: theory_id, discipline });
};

export const bulkCreateMany = async (theories: ITheory[]) => {
  const bulkData = theories.map((item) => ({
    insertOne: {
      document: item,
    },
  }));
  return TheoryModel.bulkWrite(bulkData);
};
