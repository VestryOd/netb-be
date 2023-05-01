import { TheoryItemEnum } from "@/common/enums";
import { Types } from "mongoose";

export interface ITheoryLinks {
  _id?: Types.ObjectId;
  resource_name?: string;
  url: string;
  title: string;
}

export interface ITheoryContent {
  _id?: Types.ObjectId;
  content_type: TheoryItemEnum;
  order: number;
  parentId: Types.ObjectId;
  content_data: string | [string] | [[string | number]];
  content_image?: string;
}

export interface ITheory {
  _id: Types.ObjectId;
  discipline?: string;
  title: string;
  content: ITheoryContent[];
  links?: ITheoryLinks[];
  created_at: Date;
  created_by: Types.ObjectId;
  updated_at?: Date;
  updated_by?: Types.ObjectId;
}

export interface ITheoryRequest {
  _id: Types.ObjectId;
  discipline?: string;
  title: string;
  content: Types.ObjectId[];
  links?: ITheoryLinks[];
}
