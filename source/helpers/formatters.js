/**
 * @function generateMessage
 * @param {string} field
 * @param {number} statusCode
 * @returns {string} generated message
 */
const generateMessage = (field, statusCode) => {
  return `field ${field} ${
    statusCode === 200 ? "successfully validated" : "failed validation"
  }.`;
};

/**
 * @function formatError
 * @param {string} message
 * @returns {object}
 * @exports formatError
 */
export const formatError = (message) => ({
  statusCode: 400,
  status: "error",
  message,
  data: null,
});

/**
 * @function formatValidationResponse
 * @param {object} payload
 * @param {Number} statusCode
 * @returns {object}
 * @exports formatValidationResponse
 */
export const formatValidationResponse = (payload, statusCode = 200) => {
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
