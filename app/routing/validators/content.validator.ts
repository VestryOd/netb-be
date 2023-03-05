import * as Joi from "joi";
import { TheoryItemEnum } from "@/common/enums";

const validTheoryItem = Object.values(TheoryItemEnum).join(", ");

export const theoryContentSchema = Joi.object({
  content_type: Joi.string()
    .valid(...Object.values(TheoryItemEnum))
    .required()
    .messages({
      "any.only": `This kind of discipline is unknown. Discipline could be one from these: ${validTheoryItem}`,
    }),
  content_data: Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(Joi.string()),
    Joi.array().items(Joi.array().items(Joi.string(), Joi.number()))
  ),
});
