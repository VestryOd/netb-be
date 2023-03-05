/* eslint-disable @typescript-eslint/indent,indent */
import {
  SaveImageToStorageType,
  StorageSdkService,
} from "./StorageSdk.service";
import { IImageResponse, ITheory } from "@/common/interfaces";
import { FileArray } from "express-fileupload";
import { DeleteObjectCommandOutput } from "@aws-sdk/client-s3";
import { TheoryItemEnum } from "@/common/enums";

export class MediaService {
  private storage: StorageSdkService;
  constructor() {
    this.storage = new StorageSdkService();
  }

  protected normalizeImages(
    files: SaveImageToStorageType[]
  ): Record<string, IImageResponse> {
    const result = {};
    files.forEach((file) => {
      if ("imageUrl" in file) {
        // @ts-ignore
        result[file.inputName] = file;
      }
    });
    return result;
  }

  protected normalizeTheory(
    theory: ITheory,
    files: SaveImageToStorageType[]
  ): ITheory {
    const images = this.normalizeImages(files);
    const { content } = theory;
    const updatedContent = content.map((item) => {
      const { content_type } = item;
      return content_type !== TheoryItemEnum.Img && "image_filename" in item
        ? item
        : {
            ...item,
            image_url:
              images["image_filename" in item ? item.image_filename : undefined]
                ?.imageUrl,
          };
    });
    return {
      ...theory,
      t__content: updatedContent,
    } as ITheory;
  }

  private async clearMedia(
    discipline: string,
    images: string[]
  ): Promise<DeleteObjectCommandOutput[]> {
    const deleted = await this.storage.deleteImages(discipline, images);
    console.log("--images was deleted", deleted);
    return deleted;
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
      .filter((el) => el.content_type !== TheoryItemEnum.Img)
      .flatMap((el) => ("image_url" in el ? [el.image_filename] : []));
    return images.length ? await this.clearMedia(discipline, images) : true;
  }
}
