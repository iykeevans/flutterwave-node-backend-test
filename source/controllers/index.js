import handleObjectData from "../helpers/handleObjectData";
import handleStringAndArrayData from "../helpers/handleStringAndArrayData";

/**
 * @function getPersonalInfo
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {object}
 * @exports getPersonalInfo
 */
export const getPersonalInfo = (req, res) => {
  return res.json({
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "Ezeani Ikenna",
      github: "@iykeevans",
      email: "elochi238@gmail.com",
      mobile: "07053052215",
      twitter: "@iykeevan",
    },
  });
};

/**
 * @function validateRule
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {object}
 * @exports validateRule
 */
export const validateRule = (req, res) => {
  if (typeof req.body.data === "string" || req.body.data instanceof Array) {
    const { statusCode, ...rest } = handleStringAndArrayData(req.body);

    res.status(statusCode).json(rest);
  } else {
    const { statusCode, ...rest } = handleObjectData(req.body);

    res.status(statusCode).json(rest);
  }
};
