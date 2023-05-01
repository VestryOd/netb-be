import { Schema, model } from "mongoose";
import { TheoryItemEnum } from "@/common/enums";
import { SchemaNames } from "@/common/constants";

const contentSchema = new Schema(
  {
    content_type: {
      type: String,
      default: TheoryItemEnum.Text,
    },
    parentId: { type: Schema.Types.ObjectId, required: true },
    order: { type: Number, required: true },
    content_data: {
      type: String || [String] || [[Number || String]],
      required: true,
    },
    content_image: { type: String },
  },
  { versionKey: false }
);

export const ContentModel = model(SchemaNames.Content, contentSchema);
