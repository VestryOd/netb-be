import * as Joi from "joi";
import { TheoryComplexityEnum } from "@/common/enums";
import { errorResponseSchema, parentParamSchema } from "@/common/validators";

const validComplexity = Object.values(TheoryComplexityEnum).join(", ");

export const theoryIdParamsSchema = parentParamSchema.append({
  theory_id: Joi.string().required(),
});

export const TheoryContentNavSchema = Joi.object({
  t__nav_name: Joi.string().required(),
  t__nav_url: Joi.string().required(),
  t__nav_description: Joi.string().optional().allow(null, ""),
});

export const TheoryContentImageSchema = Joi.object({
  t__image_filename: Joi.string(),
  t__image_description: Joi.string().optional(),
  t__image_url: Joi.string().optional().allow(""),
})
  .required()
  .allow(null);

export const theoryContentSchema = Joi.object({
  t__content_type: Joi.string().required(),
  t__content_text: Joi.string().allow(null, ""),
  t__content_image: Joi.alternatives().conditional("t__content_type", {
    is: "text",
    then: Joi.forbidden(),
    otherwise: TheoryContentImageSchema,
  }),
  t__content_table: Joi.array()
    .items(Joi.array().items(Joi.string()))
    .optional(),
  t__content_list: Joi.array().items(Joi.string()),
});

export const theoryObjectBasicSchema = Joi.object({
  t__title: Joi.string().required(),
  t__complexity: Joi.string()
    .valid(...Object.values(TheoryComplexityEnum))
    .required()
    .messages({
      "any.only": `This kind of discipline is unknown. Discipline could be one from these: ${validComplexity}`,
    }),
  t__tags: Joi.array().items(Joi.string()).optional(),
});

export const theoryObjectRequestSchema = theoryObjectBasicSchema.append({
  t__nav: Joi.array().items(TheoryContentNavSchema).optional().default([]),
  t__content: Joi.array().items(theoryContentSchema).default([]),
});

export const theoryObjectResponseSchema = theoryObjectBasicSchema
  .append({
    id: Joi.string().required(),
    t__nav: Joi.array()
      .items(
        TheoryContentNavSchema.append({
          id: Joi.string().required(),
        })
      )
      .optional()
      .default([]),
    t__content: Joi.array()
      .items(
        theoryContentSchema.append({
          id: Joi.string().required(),
        })
      )
      .default([]),
  })
  .options({ allowUnknown: true });

export const theoryPostResponseSchema = Joi.alternatives().try(
  theoryObjectResponseSchema,
  errorResponseSchema
);
