class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }

  static success(res, message = "Success", data = null, statusCode = 200) {
    return res.status(statusCode).json(
      new ApiResponse(statusCode, message, data)
    );
  }

  static created(res, message = "Created", data = null) {
    return res.status(201).json(
      new ApiResponse(201, message, data)
    );
  }

  static error(res, message = "Something went wrong", statusCode = 500) {
    return res.status(statusCode).json(
      new ApiResponse(statusCode, message, null)
    );
  }
}

module.exports = ApiResponse;