export default ({ fieldValue, condition, condition_value }) => {
  if (condition === "eq") return fieldValue === condition_value;
  if (condition === "neq") return fieldValue !== condition_value;
  if (condition === "gt") return fieldValue > condition_value;
  if (condition === "gte") return fieldValue >= condition_value;
  if (condition === "contains") {
    if (typeof fieldValue === "number" || typeof condition_value === "number") {
      return false;
    } else {
      return fieldValue.includes(condition_value);
    }
  }
};
