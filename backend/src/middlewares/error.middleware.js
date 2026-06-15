const ApiResponse = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  return ApiResponse.error(
    res,
    process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : err.message,
    statusCode
  );
};

module.exports = errorHandler;