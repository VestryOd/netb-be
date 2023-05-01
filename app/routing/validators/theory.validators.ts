import * as Joi from "joi";
import { parentParamSchema } from "@/common/validators";
import { theoryContentSchema } from "./content.validator";
import { isValidObjectId } from "@/common/helpers";

export const theoryIdParamsSchema = parentParamSchema.append({
  theory_id: Joi.string().required().custom(isValidObjectId),
});

export const TheoryLinksSchema = Joi.object({
  resource_name: Joi.string().required(),
  url: Joi.string().required(),
  title: Joi.string().optional().allow(null, ""),
});

export const theoryObjectRequestSchema = Joi.object({
  title: Joi.string().required(),
  links: Joi.array().items(TheoryLinksSchema).optional().default([]),
  content: Joi.array().items(theoryContentSchema).default([]),
});
