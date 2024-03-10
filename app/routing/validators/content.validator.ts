import * as Joi from "joi";

export const theoryContentSchema = Joi.object({
  content_type: Joi.string().required(),
  order: Joi.number().required(),
  content_data: Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(Joi.string()),
    Joi.array().items(Joi.array().items(Joi.string(), Joi.number()))
  ),
  content_image: Joi.string(),
});
