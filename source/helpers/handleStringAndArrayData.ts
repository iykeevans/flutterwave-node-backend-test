import { formatError, formatValidationResponse } from "./formatters";
import evaluator from "./evaluator";

interface IPayload {
  rule: IRule;
  data: any;
}

interface IRule {
  field: string;
  condition: string;
  condition_value: string | number;
}

export default ({ rule, data }: IPayload) => {
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
    typeof data === "string" ? data[Number(field)] : data[Number(field) - 1];

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
