import { TheoryComplexityEnum, TheoryItemEnum } from "@/common/enums";

export interface ITheoryLinks {
  _id?: string;
  resource_name?: string;
  url: string;
  title: string;
}

export interface ITheoryImage {
  _id?: string;
  content_type: string;
  image_filename: string;
  image_url: string;
  image_description?: string;
}

export interface ITheoryContent {
  _id?: string;
  content_type: TheoryItemEnum;
  content_data: string | [string] | [[string | number]];
}

export interface ITheory {
  _id: string;
  discipline?: string;
  title: string;
  complexity: TheoryComplexityEnum;
  content: [ITheoryImage | ITheoryContent];
  links?: ITheoryLinks[];
  created_at: Date;
  created_by: string;
}
