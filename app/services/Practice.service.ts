import {
  getAll,
  getById,
  createOne,
  deleteOne,
  updateOne,
} from "@/db/practice.db";
import { IPracticeService } from "@/common/interfaces";

export const practiceAllHandler = async ({ discipline }: IPracticeService) => {
  return await getAll({ discipline });
};

export const practiceOneHandler = async ({
  discipline,
  practice_id,
}: IPracticeService) => {
  return await getById({ discipline, practice_id });
};

export const createNewPractice = async ({
  discipline,
  body,
}: IPracticeService) => {
  return await createOne({ discipline, body });
};

export const deleteOnePractice = async ({
  discipline,
  practice_id,
}: IPracticeService) => {
  return await deleteOne({ discipline, practice_id });
};

export const updateOnePractice = async ({
  discipline,
  practice_id,
  body,
}: IPracticeService) => {
  return await updateOne({ discipline, practice_id, body });
};
