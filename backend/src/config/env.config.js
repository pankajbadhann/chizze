const dotenv = require("dotenv");
dotenv.config();

/**
 * --------------------------------------------------
 * CENTRALIZED ENV CONFIG (PRODUCTION SAFE)
 * --------------------------------------------------
 * - Loads dotenv ONCE
 * - Validates critical env vars early
 * - Prevents runtime crashes in random modules
 */

const requiredEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing required env variable: ${key}`);
  }
  return value;
};

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,

  databaseUrl: requiredEnv("DATABASE_URL"),
  jwtSecret: requiredEnv("JWT_SECRET"),

  corsOrigin: process.env.CORS_ORIGIN || "*",

  rateLimitWindowMs: 15 * 60 * 1000,
  rateLimitMax: 100
};

module.exports = env;