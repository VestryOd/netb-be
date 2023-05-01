import { ITheory, ITheoryService } from "@/common/interfaces";
import { Types } from "mongoose";
import {
  createOne,
  getById,
  getAll,
  deleteOne,
  updateOne,
} from "../db/theory.db";
import { MediaService } from "./Media.service";
import { ContentService } from "./Content.service";
import { UNKNOWN_ERROR } from "@/common/constants";
import { MongoDeleteManyResultType } from "@/common/types";

export class TheoryService {
  private mediaService: MediaService;
  private contentService: ContentService;
  constructor() {
    this.mediaService = new MediaService();
    this.contentService = new ContentService();
  }

  async getAll({
    discipline,
    limit,
    skip,
  }: Partial<ITheoryService>): Promise<ITheory[]> {
    return await getAll({ discipline, limit, skip });
  }

  async getOne({
    discipline,
    theory_id,
  }: Partial<ITheoryService>): Promise<ITheory[]> {
    return await getById({ discipline, theory_id });
  }

  async createOne({ discipline, theory, user_id }: Partial<ITheoryService>) {
    const parentId = new Types.ObjectId();
    const savedContent = await this.contentService.generateContent(
      theory.content,
      parentId
    );

    return await createOne({
      discipline,
      theory: { ...theory, content: savedContent, _id: parentId },
      user_id,
    });
  }

  private async clearContent({
    discipline,
    theory,
  }: Partial<ITheoryService>): Promise<MongoDeleteManyResultType> {
    await this.mediaService.clearMediaFromTheory(discipline, theory);
    const deleted = await this.contentService.deleteContent(theory._id);

    if (deleted.deletedCount === 0) {
      throw UNKNOWN_ERROR("No content items cleared");
    }

    return deleted;
  }

  async deleteOne({ discipline, theory_id }: Partial<ITheoryService>) {
    const [theory] = await this.getOne({ discipline, theory_id });

    await this.clearContent({ discipline, theory });
    return await deleteOne({ discipline, theory_id });
  }

  async updateOne({
    discipline,
    theory_id,
    theory,
  }: Partial<ITheoryService>): Promise<ITheory> {
    const parentId = new Types.ObjectId(theory_id);

    const [oldTheory] = await this.getOne({ discipline, theory_id });

    await this.clearContent({
      discipline,
      theory: oldTheory,
    });
    const content = await this.contentService.generateContent(
      theory.content,
      parentId
    );

    return await updateOne({
      theory: { ...theory, content },
      theory_id,
    });
  }
}
