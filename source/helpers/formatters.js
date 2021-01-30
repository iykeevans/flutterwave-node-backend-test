const generateStatusMessage = (field, statusCode) => {
  return `field ${field} ${
    statusCode === 200 ? "successfully validated" : "failed validation"
  }.`;
};

export const formatError = (message) => ({
  statusCode: 400,
  error: true,
  message,
  data: null,
});

export const formatValidationResponse = (payload, statusCode = 200) => {
  const { field, fieldValue, condition, condition_value } = payload;

  return {
    statusCode,
    message: generateStatusMessage(field, statusCode),
    status: statusCode === 200 ? "success" : "error",
    data: {
      validation: {
        error: statusCode === 200,
        field: field,
        field_value: fieldValue,
        condition: condition,
        condition_value: condition_value,
      },
    },
  };
};
