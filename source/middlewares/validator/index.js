import schema from "./schema";

/**
 * @function validator
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - express next handler function
 * @returns {void}
 * @exports validator
 */
export default (req, res, next) => {
  const { error } = schema.validate(req.body);
  // console.log(error);
  if (error) {
    // regex to remove double quotes added by joi library
    const errorMessage = error.message.replace(/"([^"]+(?="))"/g, "$1");
    next(new Error(errorMessage));
  } else {
    next();
  }
};
