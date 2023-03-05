import { Schema, model } from "mongoose";
import { TheoryItemEnum } from "@/common/enums";
import { SchemaNames } from "@/common/constants";

const contentSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    content_type: {
      type: String,
      default: TheoryItemEnum.Text,
    },
    content_data: String || [String] || [[Number || String]],
  },
  { versionKey: false }
);

export const ContentModel = model(SchemaNames.Content, contentSchema);
