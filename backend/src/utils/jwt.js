const jwt = require("jsonwebtoken");
const env = require("../config/env.config");

/**
 * --------------------------------------------------
 * JWT CORE UTIL (PRODUCTION GRADE)
 * --------------------------------------------------
 * - Centralized token handling
 * - Safe verify layer
 * - Extensible for refresh tokens later
 */

const JWT_OPTIONS = {
  expiresIn: "2d",
  issuer: "chat-backend",
  audience: "chat-users"
};

/**
 * Generate JWT token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    env.jwtSecret,
    JWT_OPTIONS
  );
};

/**
 * Verify JWT token (throws error if invalid)
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.jwtSecret, {
      issuer: JWT_OPTIONS.issuer,
      audience: JWT_OPTIONS.audience
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Decode token WITHOUT verification (safe use only for debugging)
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

/**
 * Extract token from Authorization header
 */
const extractTokenFromHeader = (header) => {
  if (!header || !header.startsWith("Bearer ")) {
    return null;
  }
  return header.slice(7);
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
  extractTokenFromHeader
};