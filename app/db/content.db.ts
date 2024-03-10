import { ITheoryContent } from "@/common/interfaces";
import { ContentModel } from "./models";
import { Types } from "mongoose";
import { MongoDeleteManyResultType } from "../common/types";

export const createMany = async (
  contentData: Omit<ITheoryContent, "_id">[]
): Promise<ITheoryContent[]> => {
  return ContentModel.insertMany(contentData);
};

export const bulkCreateMany = async (
  contentData: Omit<ITheoryContent, "_id">[]
) => {
  const bulkData = contentData.map((item) => ({
    insertOne: {
      document: item,
    },
  }));
  return ContentModel.bulkWrite(bulkData);
};

export const createOne = async (contentData: Omit<ITheoryContent, "_id">) => {
  const newContent = await new ContentModel(contentData);
  await newContent.save();
  return newContent;
};

export const deleteOne = async (contentId: string) => {
  return ContentModel.findByIdAndDelete(contentId);
};

export const deleteMany = async (
  parentId: Types.ObjectId
): Promise<MongoDeleteManyResultType> => {
  return ContentModel.deleteMany({ parentId });
};

export const updateContent = async (
  contentId: string,
  contentItem: Omit<ITheoryContent, "_id">
) => {
  return ContentModel.findByIdAndUpdate(contentId, contentItem, { new: true });
};

export const updateMany = async (contentItems: ITheoryContent[]) => {
  const updates = contentItems.map((item) => ({
    updateOne: {
      filter: { _id: item._id },
      update: item,
    },
  }));
  return ContentModel.bulkWrite(updates);
};
