import { ITheory, ITheoryService } from "@/common/interfaces";
import { createOne, getById, getAll, deleteOne } from "../db/theory.db";
import { MediaService } from "./Media.service";

export class TheoryService {
  private mediaService: MediaService;
  constructor() {
    this.mediaService = new MediaService();
  }

  async getAll({ discipline }: ITheoryService): Promise<ITheory[]> {
    return await getAll({ discipline });
  }

  async getOne({ discipline, theory_id }: ITheoryService): Promise<ITheory> {
    return await getById({ discipline, theory_id });
  }

  async createOne({ discipline, theory }: ITheoryService): Promise<ITheory> {
    return await createOne({ discipline, theory });
  }

  async deleteOne({ discipline, theory_id }: ITheoryService) {
    const theory = await this.getOne({ discipline, theory_id });
    const deleted = await this.mediaService.clearMediaFromTheory(
      discipline,
      theory
    );
    console.log("--deleted images", deleted, theory);
    return await deleteOne({ discipline, theory_id });
  }

  async updateOne({ discipline, theory_id, theory, files }: ITheoryService) {
    await this.deleteOne({ discipline, theory_id });
    return await this.createOne({ discipline, theory, files });
  }
}
