import Joi from "joi";

export default Joi.object()
  .keys({
    rule: Joi.object()
      .keys({
        field: Joi.string().required().messages({
          "string.base": "rule.field should be a string",
          "string.empty": "rule.field should not be an empty string",
        }),
        condition: Joi.string()
          .valid("eq", "neq", "gt", "gte", "contains")
          .required()
          .messages({
            "any.only":
              "rule.condition should be one of [eq, neq, gt, gte, contains]",
          }),
        condition_value: Joi.alternatives()
          .try(Joi.string(), Joi.number())
          .required()
          .messages({
            "alternatives.types":
              "rule.condition_value should be one of [string, number]",
            "string.empty":
              "rule.condition_value should not be an empty string",
          }),
      })
      .required()
      .messages({ "object.base": "rule should be an object" }),
    data: Joi.alternatives()
      .try(Joi.string(), Joi.array(), Joi.object())
      .required()
      .messages({
        "alternatives.types": "data should be one of [string, array, object]",
        "string.empty": "data should not be an empty string",
      }),
  })
  .messages({ "object.base": "Invalid JSON payload passed" });
