/* eslint-disable @typescript-eslint/indent,indent */
import {
  SaveImageToStorageType,
  StorageSdkService,
} from "./StorageSdk.service";
import { IImageResponse, ITheory } from "@/common/interfaces";
import { FileArray } from "express-fileupload";
import { DeleteObjectCommandOutput } from "@aws-sdk/client-s3";
import { parseFilenameFromImageLink } from "@/common/helpers";

export class MediaService {
  private storage: StorageSdkService;
  constructor() {
    this.storage = new StorageSdkService();
  }

  protected getImagesMap(
    files: SaveImageToStorageType[]
  ): Record<string, IImageResponse> {
    return files.reduce((acc, file) => {
      if ("imageUrl" in file) {
        // @ts-ignore
        acc[file.inputName] = file;
      }
      return acc;
    }, {});
  }

  protected normalizeTheory(
    theory: ITheory,
    files: SaveImageToStorageType[]
  ): ITheory {
    const imagesMap = this.getImagesMap(files);

    const { content } = theory;
    const updatedContent = content.map((item) => {
      const { content_image } = item;
      return content_image && imagesMap[content_image]
        ? { ...item, content_image: imagesMap[content_image]?.imageUrl }
        : item;
    });

    return {
      ...theory,
      content: updatedContent,
    } as ITheory;
  }

  private async clearMedia(
    discipline: string,
    images: string[]
  ): Promise<DeleteObjectCommandOutput[]> {
    return await this.storage.deleteImages(discipline, images);
  }

  private async saveMediaToStorage(
    discipline: string,
    files: FileArray
  ): Promise<SaveImageToStorageType[]> {
    return await this.storage.saveImagesToStorage(discipline, files);
  }

  async saveMediaAndUpdateTheory(
    discipline: string,
    theory: ITheory,
    files: FileArray
  ): Promise<ITheory> {
    const savedMedia = await this.saveMediaToStorage(discipline, files);

    return this.normalizeTheory(theory, savedMedia);
  }

  async clearMediaFromTheory(
    discipline: string,
    theory: ITheory
  ): Promise<true | DeleteObjectCommandOutput[]> {
    const images = theory.content
      .filter((el) => "content_image" in el)
      .map(({ content_image }) => parseFilenameFromImageLink(content_image));

    return images.length ? await this.clearMedia(discipline, images) : true;
  }
}
