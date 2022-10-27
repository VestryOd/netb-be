import {
  SaveImageToStorageType,
  StorageSdkService,
} from "./StorageSdk.service";
import { IImageResponse, ITheory, ITheoryImage } from "@/common/interfaces";
import { FileArray } from "express-fileupload";
import { DeleteObjectCommandOutput } from "@aws-sdk/client-s3";

export class MediaService {
  private storage: StorageSdkService;
  constructor() {
    this.storage = new StorageSdkService();
  }

  protected prepareImagesData(images: ITheoryImage[]) {
    return images.map((image) => image.t__image_filename);
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

  protected normalizeImageContent(
    image: IImageResponse,
    theoryImage: ITheoryImage
  ): Omit<ITheoryImage, "id"> | null {
    if (!theoryImage) return null;

    const { t__image_description } = theoryImage;
    const { imageUrl, fileName } = image;
    return {
      t__image_filename: fileName,
      t__image_description,
      t__image_url: imageUrl,
    };
  }

  protected normalizeTheory(
    theory: Omit<ITheory, "id">,
    files: SaveImageToStorageType[]
  ): Omit<ITheory, "id"> {
    const images = this.normalizeImages(files);
    const { t__content } = theory;
    const updatedContent = t__content.map((item) => {
      const { t__content_image } = item;
      const contentImage = this.normalizeImageContent(
        images[t__content_image.t__image_filename],
        t__content_image
      );
      return !t__content_image
        ? item
        : { ...item, t__content_image: contentImage };
    });
    return {
      ...theory,
      t__content: updatedContent,
    } as ITheory;
  }

  private async clearMedia(
    discipline: string,
    images: ITheoryImage[]
  ): Promise<DeleteObjectCommandOutput[]> {
    const imageNames = this.prepareImagesData(images);
    const deleted = await this.storage.deleteImages(discipline, imageNames);
    console.log("--images was deleted", deleted);
    return deleted;
  }

  private async saveMediaToStorage(
    discipline: string,
    files: FileArray
  ): Promise<SaveImageToStorageType[]> {
    const created = await this.storage.saveImagesToStorage(discipline, files);
    console.log("--images was created", created);
    return created;
  }

  async saveMediaAndUpdateTheory(
    discipline: string,
    theory: Omit<ITheory, "id">,
    files: FileArray
  ): Promise<Omit<ITheory, "id"> | ITheory> {
    const savedMedia = await this.saveMediaToStorage(discipline, files);
    return this.normalizeTheory(theory, savedMedia);
  }

  async clearMediaFromTheory(
    discipline: string,
    theory: ITheory
  ): Promise<true | DeleteObjectCommandOutput[]> {
    const images = theory.t__content
      .filter((el) => el.t__content_image)
      .map((el) => el.t__content_image);
    return images.length ? await this.clearMedia(discipline, images) : true;
  }
}
