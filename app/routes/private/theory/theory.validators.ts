import * as Joi from "joi";
import { DisciplineEnum } from "@/common/enums";
import { errorResponseSchema } from "@/common/validators";

const validDisciplines = Object.values(DisciplineEnum).join(", ");

export const theoryParentParamsSchema = Joi.object({
  discipline: Joi.string()
    .valid(...Object.values(DisciplineEnum))
    .required()
    .messages({
      "any.only": `This kind of discipline is unknown. Discipline could be one from these: ${validDisciplines}`,
    }),
});

export const theoryIdParamsSchema = theoryParentParamsSchema.append({
  theory_id: Joi.string().required(),
});

export const TheoryContentNavSchema = Joi.object({
  t__nav_name: Joi.string().required(),
  t__nav_url: Joi.string().required(),
  t__nav_description: Joi.string().optional(),
});

export const theoryContentSchema = Joi.object({
  t__content_type: Joi.string().required(),
  t__content_text: Joi.string().allow(null, ""),
  t__content_nav: Joi.array().items(TheoryContentNavSchema).optional(),
  t__content_table: Joi.array()
    .items(Joi.array().items(Joi.string()))
    .optional(),
  t__content_list: Joi.array().items(Joi.string()),
});

export const theoryObjectSchema = Joi.object({
  t__title: Joi.string().required(),
  t__content: Joi.array().items(theoryContentSchema),
  tags: Joi.array().items(Joi.string()).optional(),
});

export const theoryGetResponseSchema = Joi.array().items(theoryObjectSchema);

export const theoryPostResponseSchema = Joi.alternatives().try(
  theoryGetResponseSchema,
  errorResponseSchema
);
