import { Schema, model } from "mongoose";
import { TheoryItemEnum } from "@/common/enums";
import {
  SchemaNames,
  urlValidateMessage,
  urlValidateRegexp,
} from "@/common/constants";

const imageSchema = new Schema(
  {
    content_type: {
      type: String,
      default: TheoryItemEnum.Img,
    },
    image_filename: String,
    image_description: String,
    image_url: {
      type: String,
      required: true,
      validate: {
        validator: (str: string) => urlValidateRegexp.test(str),
        message: urlValidateMessage,
      },
    },
  },
  { versionKey: false }
);

export const ImageModel = model(SchemaNames.Image, imageSchema);
