import { TheoryComplexityEnum, TheoryItemEnum } from "@/common/enums";

export interface ITheoryNav {
  id: string;
  t__nav_name: string;
  t__nav_url: string;
  t__nav_description?: string;
}

export interface ITheoryImage {
  id: string;
  t__image_filename: string;
  t__image_url: string;
  t__image_description?: string;
}

export interface ITheoryContent {
  id: string;
  t__content_type: TheoryItemEnum;
  t__content_text: string;
  t__content_image?: ITheoryImage;
  t__content_table?: string[][];
  t__content_list?: string[];
}

export interface ITheory {
  id: string;
  t__title: string;
  t__complexity: TheoryComplexityEnum;
  t__content: ITheoryContent[];
  t__nav?: ITheoryNav[];
  t__tags?: string[];
}
