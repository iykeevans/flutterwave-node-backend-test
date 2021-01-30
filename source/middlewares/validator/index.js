import Joi from "@hapi/joi";

const schema = Joi.object()
  .keys({
    rule: Joi.object()
      .keys({
        field: Joi.string().required(),
        condition: Joi.string()
          .valid("eq", "neq", "gt", "gte", "contains")
          .required(),
        condition_value: Joi.alternatives()
          .try(Joi.string(), Joi.number())
          .required(),
      })
      .required()
      .messages({ "object.base": "rule should be an object" }),
    data: Joi.alternatives()
      .try(Joi.string(), Joi.array(), Joi.object())
      .required(),
  })
  .label("payload");

export default (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400);
    const errorMessage = error.message.replace(/"([^"]+(?="))"/g, "$1");
    next(
      new Error(errorMessages[error.details[0].context.label] || errorMessage)
    );
  } else {
    next();
  }
};

const errorMessages = {
  payload: "Invalid JSON payload passed",
};
