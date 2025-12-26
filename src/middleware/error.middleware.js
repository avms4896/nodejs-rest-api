const AppError = require("../utils/AppError");

const globalErrorHandler = (err, req, res, next) => {
  let error = err;

  if (!error.statusCode) {
    error = new AppError("Internal Server Error", 500);
  }

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message
  });
};

module.exports = globalErrorHandler;
