import { ITheoryContent } from "@/common/interfaces";
import { MongoDeleteManyResultType } from "@/common/types";
import { Types } from "mongoose";
import {
  createMany as createManyContent,
  deleteMany as deleteManyContent,
} from "../db/content.db";

export class ContentService {
  public async generateContent(
    contentArray: ITheoryContent[],
    parentId: Types.ObjectId
  ): Promise<Types.ObjectId[]> {
    const normalized = contentArray.map((el) => ({ ...el, parentId }));

    const savedContent = await createManyContent(normalized);

    return savedContent.sort((a, b) => a.order - b.order).map(({ _id }) => _id);
  }

  public async deleteContent(
    parentId: Types.ObjectId
  ): Promise<MongoDeleteManyResultType> {
    return await deleteManyContent(parentId);
  }
}
