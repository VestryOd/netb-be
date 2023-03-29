import * as Joi from "joi";
import { TheoryComplexityEnum } from "@/common/enums";
import { parentParamSchema } from "@/common/validators";
import { theoryContentSchema } from "./content.validator";
import { TheoryContentImageSchema } from "./image.validator";
import { isValidObjectId } from "@/common/helpers";

const validComplexity = Object.values(TheoryComplexityEnum).join(", ");

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
  complexity: Joi.string()
    .valid(...Object.values(TheoryComplexityEnum))
    .required()
    .messages({
      "any.only": `This kind of discipline is unknown. Discipline could be one from these: ${validComplexity}`,
    }),
  links: Joi.array().items(TheoryLinksSchema).optional().default([]),
  content: Joi.array()
    .items(Joi.alternatives(theoryContentSchema, TheoryContentImageSchema))
    .default([]),
});
