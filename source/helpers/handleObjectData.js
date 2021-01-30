import { formatError, formatValidationResponse } from "./formatters";
import evaluator from "./evaluator";

export default ({ rule, data }) => {
  const { field, condition, condition_value } = rule;
  const fieldArray = field.split(".");

  // check if rule depth is greater than 2
  if (fieldArray.length > 2) {
    return formatError("rule.field depth should not be greater than 2");
  } else {
    if (!data[fieldArray[0]]) {
      return formatError(`field ${fieldArray[0]} is missing from data`);
    }

    let fieldValue = { ...data };

    fieldArray.forEach((ruleField) => {
      fieldValue = fieldValue[ruleField];
    });

    // to check if data depth is supported by provided rules
    if (!fieldValue) {
      return formatError(`field ${field} is missing from data`);
    }

    // check if data rule field is returning an object or value
    if (typeof fieldValue !== "string" && Object.keys(fieldValue).length) {
      return formatError(`field ${field} has an insufficient rule depth`);
    }

    if (evaluator({ fieldValue, condition, condition_value })) {
      return formatValidationResponse({
        field,
        fieldValue,
        condition,
        condition_value,
      });
    }

    return formatValidationResponse(
      {
        field,
        fieldValue,
        condition,
        condition_value,
      },
      400
    );
  }
};
