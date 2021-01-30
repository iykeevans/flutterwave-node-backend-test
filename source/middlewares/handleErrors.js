/**
 * @function handleErrors
 * @param {object} err - error object
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - express next handler function
 * @returns {object}
 * @exports handleErrors
 */
export default (err, req, res, next) => {
  if (err) {
    return res.status(400).json({
      status: "error",
      message: `${err.message}.`,
      data: null,
    });
  }

  return res.status(500).json({
    status: "error",
    message: err.message,
  });
};
