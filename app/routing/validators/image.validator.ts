import * as Joi from "joi";
import { TheoryItemEnum } from "@/common/enums";

export const TheoryContentImageSchema = Joi.object({
  content_type: Joi.string().required().valid(TheoryItemEnum.Img),
  image_filename: Joi.string(),
  image_description: Joi.string().optional(),
  image_url: Joi.string().optional().allow(""),
});
