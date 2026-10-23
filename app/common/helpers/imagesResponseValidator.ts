import { SaveImageToStorageType } from "../../services";

export const imagesResponseValidator = (
  images: SaveImageToStorageType[]
): boolean => {
  if (!images?.length) return false;
  return !images.some((image) => "$metadata" in image);
};
