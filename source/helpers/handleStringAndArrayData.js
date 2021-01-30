import { formatError, formatValidationResponse } from "./formatters";
import evaluator from "./evaluator";

/**
 * @function handleStringAndArrayData
 * @param {array|string} payload - req.body payload
 * @returns {object}
 * @exports handleStringAndArrayData
 */
export default ({ rule, data }) => {
  const { field, condition, condition_value } = rule;

  // to check if field is out of bounds
  if (
    isNaN(Number(field)) ||
    data.length < Number(field) ||
    Number(field) < 0
  ) {
    return formatError(`field ${field} is missing from data.`);
  }

  const fieldValue =
    typeof data === "string" ? data[field] : data[Number(field) - 1];

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
};
