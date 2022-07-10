import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import { TheoryComplexityEnum, TheoryItemEnum } from "@/common/enums";
const { Schema } = mongoose;

const theorySchema = new Schema(
  {
    t__title: { type: String, default: "" },
    t__complexity: {
      type: String,
      enum: [...Object.values(TheoryComplexityEnum)],
      default: TheoryComplexityEnum.Lower,
    },
    t__content: {
      type: [
        {
          id: { type: String, default: uuidv4() },
          t__content_type: {
            type: String,
            enum: [...Object.values(TheoryItemEnum)],
            default: TheoryItemEnum.Text,
          },
          t__content_text: { type: String, default: "" },
          t__content_table: { type: [[Number]] },
          t__content_list: [String],
        },
      ],
      default: [],
      validate: [(arr: any[]) => arr.length >= 1, "{PATH} needs min 1 item"],
      _id: false,
    },
    t__nav: {
      type: [
        {
          id: { type: String, default: uuidv4() },
          t__nav_name: String,
          t__nav_url: String,
          t__nav_description: String,
        },
      ],
      _id: false,
    },
  },
  { versionKey: false }
);

const jsDB = mongoose.connection.useDb("js");

export const Theory = jsDB.model("Theory", theorySchema);
