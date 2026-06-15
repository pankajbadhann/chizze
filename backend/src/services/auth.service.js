const bcrypt = require("bcryptjs");

const userRepo = require("../repositories/user.repository");

const { generateToken } = require("../utils/jwt");
const loginAttempts = require("../utils/loginAttempts");

const sanitizeUser = (user) => ({
  id: user.id,
  email: user.email,
  createdAt: user.createdAt,
});

/**
 * --------------------------------------------------
 * REGISTER
 * --------------------------------------------------
 */
const register = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await userRepo.findUserByEmail(normalizedEmail);

  if (existingUser) {
    const error = new Error("Email already registered");

    error.statusCode = 409;

    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await userRepo.createUser({
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = generateToken(user.id);

    return {
      user: sanitizeUser(user),
      token,
    };
  } catch (err) {
    /**
     * Handles race condition where
     * two requests register same email
     * simultaneously.
     */
    if (err.code === "P2002") {
      const error = new Error("Email already registered");

      error.statusCode = 409;

      throw error;
    }

    throw err;
  }
};

/**
 * --------------------------------------------------
 * LOGIN
 * --------------------------------------------------
 */
const login = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  if (loginAttempts.isBlocked(normalizedEmail)) {
    const error = new Error("Too many failed attempts. Try again later.");
    error.statusCode = 429;
    throw error;
  }
  const user = await userRepo.findUserByEmail(normalizedEmail);

  /**
   * Dummy hash comparison
   * reduces timing differences
   */
  const fallbackHash =
    "$2a$12$J3n2m0y0A4mDq4S2j5Q9wu1aE0iP7v1bIY7gI6u0k2M3tM6V7nXbG";

  const hashToCompare = user?.password || fallbackHash;

  const passwordMatches = await bcrypt.compare(password, hashToCompare);

  if (!user || !passwordMatches) {
    loginAttempts.recordAttempt(normalizedEmail);

    const error = new Error("Invalid credentials");
    error.statusCode = 401;

    throw error;
  }

  const token = generateToken(user.id);

  loginAttempts.resetAttempts(normalizedEmail);

  return {
    user: sanitizeUser(user),
    token,
  };
};

module.exports = {
  register,
  login,
};
