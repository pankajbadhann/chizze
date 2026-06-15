const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const env = require("../config/env.config");
const logger = require("../utils/logger");

/**
 * --------------------------------------------------
 * POSTGRES POOL
 * --------------------------------------------------
 */
const pool = new Pool({
  connectionString: env.databaseUrl,

  max: 20,

  idleTimeoutMillis: 30000,

  connectionTimeoutMillis: 5000,

  ssl:
    env.nodeEnv === "production"
      ? {
          rejectUnauthorized: false,
        }
      : false,
});

pool.on("connect", () => {
  logger.debug(
    "PostgreSQL connection established"
  );
});

pool.on("error", (error) => {
  logger.error(
    error,
    "Unexpected PostgreSQL pool error"
  );
});

/**
 * --------------------------------------------------
 * PRISMA ADAPTER
 * --------------------------------------------------
 */
const adapter = new PrismaPg(pool);

/**
 * --------------------------------------------------
 * PRISMA CLIENT
 * --------------------------------------------------
 */
const prisma = new PrismaClient({
  adapter,

  log:
    env.nodeEnv === "development"
      ? ["query", "warn", "error"]
      : ["warn", "error"],
});

/**
 * --------------------------------------------------
 * PRISMA EVENT LOGGING
 * --------------------------------------------------
 */
prisma.$on("warn", (event) => {
  logger.warn(event);
});

prisma.$on("error", (event) => {
  logger.error(event);
});

/**
 * --------------------------------------------------
 * DATABASE CONNECTIVITY CHECK
 * --------------------------------------------------
 */
const connectDatabase = async () => {
  try {
    await prisma.$connect();

    logger.info(
      "Database connected successfully"
    );
  } catch (error) {
    logger.fatal(
      error,
      "Failed to connect database"
    );

    process.exit(1);
  }
};

module.exports = {
  prisma,
  connectDatabase,
};