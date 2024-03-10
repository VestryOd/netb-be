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
      type: Schema.Types.Mixed,
      required: true,
      validate: {
        validator(value: any) {
          // Custom validation based on content_type
          if (this.content_type === TheoryItemEnum.Table) {
            // Check if value is an array of arrays of strings
            return (
              Array.isArray(value) &&
              value.every(
                (innerArray) =>
                  Array.isArray(innerArray) &&
                  innerArray.every((item) => typeof item === "string")
              )
            );
          } else if (this.content_type === TheoryItemEnum.Text) {
            return typeof value === "string";
          } else if (this.content_type === TheoryItemEnum.List) {
            return (
              Array.isArray(value) &&
              value.every((item) => typeof item === "string")
            );
          } else if (this.content_type === TheoryItemEnum.Code) {
            return typeof value === "string";
          } else {
            return false;
          }
        },
        message: "Invalid content_data based on content_type",
      },
    },
    content_image: { type: String },
  },
  { versionKey: false }
);

export const ContentModel = model(SchemaNames.Content, contentSchema);
