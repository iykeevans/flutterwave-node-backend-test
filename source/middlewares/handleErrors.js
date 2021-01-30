export default (err, req, res, next) => {
  if (err) {
    return res.json({
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
