const generateMessage = (
  field: string | number,
  statusCode: number
): string => {
  return `field ${field} ${
    statusCode === 200 ? "successfully validated" : "failed validation"
  }.`;
};

interface IFormatError {
  statusCode: number;
  status: string;
  message: string;
  data: object;
}

export const formatError = (message: string): IFormatError => ({
  statusCode: 400,
  status: "error",
  message,
  data: null,
});

interface IPayload {
  field: string;
  fieldValue: string | number;
  condition: string;
  condition_value: string | number;
}

export const formatValidationResponse = (
  payload: IPayload,
  statusCode = 200
) => {
  const { field, fieldValue, condition, condition_value } = payload;

  return {
    statusCode,
    message: generateMessage(field, statusCode),
    status: statusCode === 200 ? "success" : "error",
    data: {
      validation: {
        error: statusCode !== 200,
        field: field,
        field_value: fieldValue,
        condition: condition,
        condition_value: condition_value,
      },
    },
  };
};
