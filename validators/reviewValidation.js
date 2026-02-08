const Joi = require("joi");

const reviewCreateSchema = Joi.object({
  gameTitle: Joi.string().min(2).max(120).required(),
  platform: Joi.string().max(40).allow("", null),
  rating: Joi.number().min(1).max(10).required(),
  content: Joi.string().min(10).max(5000).required(),
  pros: Joi.array().items(Joi.string().max(120)).default([]),
  cons: Joi.array().items(Joi.string().max(120)).default([]),
  status: Joi.string().valid("draft", "published").default("published")
});

const reviewUpdateSchema = Joi.object({
  gameTitle: Joi.string().min(2).max(120),
  platform: Joi.string().max(40).allow("", null),
  rating: Joi.number().min(1).max(10),
  content: Joi.string().min(10).max(5000),
  pros: Joi.array().items(Joi.string().max(120)),
  cons: Joi.array().items(Joi.string().max(120)),
  status: Joi.string().valid("draft", "published")
}).min(1);

module.exports = { reviewCreateSchema, reviewUpdateSchema };
