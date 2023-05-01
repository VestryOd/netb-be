import {
  getAll,
  getById,
  createOne,
  deleteOne,
  updateOne,
} from "@/db/practice.db";
import {
  IPracticeService,
  IPracticeServiceCreate,
  IPracticeServiceItem,
  IPracticeServiceUpdate,
} from "@/common/interfaces";

export const practiceAllHandler = async ({
  discipline,
  limit,
  skip,
}: IPracticeService) => {
  return await getAll({ discipline, limit, skip });
};

export const practiceOneHandler = async ({
  discipline,
  practice_id,
}: IPracticeServiceItem) => {
  return await getById({ discipline, practice_id });
};

export const createNewPractice = async ({
  discipline,
  body,
  user_id,
}: IPracticeServiceCreate) => {
  return await createOne({ discipline, body, user_id });
};

export const deleteOnePractice = async ({
  discipline,
  practice_id,
}: IPracticeServiceItem) => {
  return await deleteOne({ discipline, practice_id });
};

export const updateOnePractice = async ({
  discipline,
  practice_id,
  body,
  user_id,
}: IPracticeServiceUpdate) => {
  return await updateOne({ discipline, practice_id, body, user_id });
};
