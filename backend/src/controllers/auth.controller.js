const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const authService = require("../services/auth.service");

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  return ApiResponse.created(res, "User registered", result);
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  return ApiResponse.success(res, "Login successful", result);
});

module.exports = {
  register,
  login,
};