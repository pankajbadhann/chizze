const { verifyToken, extractTokenFromHeader } = require("../utils/jwt");
const logger = require("../utils/logger");

/**
 * --------------------------------------------------
 * AUTH MIDDLEWARE (PRODUCTION GRADE)
 * --------------------------------------------------
 * Responsibilities:
 * - Validate JWT
 * - Attach user context
 * - Fail fast & clean responses
 */

const authMiddleware = (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    const decoded = verifyToken(token);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload"
      });
    }

    /**
     * Attach user context to request
     */
    req.user = {
      id: decoded.userId
    };

    /**
     * Structured debug log (production safe)
     */
    logger.debug({
      userId: decoded.userId,
      path: req.originalUrl,
      method: req.method
    });

    next();
  } catch (error) {
    logger.warn({
      message: error.message,
      path: req.originalUrl,
      ip: req.ip
    });

    /**
     * JWT specific error handling
     */
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired"
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    return res.status(401).json({
      success: false,
      message: "Authentication failed"
    });
  }
};

module.exports = authMiddleware;