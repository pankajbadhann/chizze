require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { initSocket, getIO } = require("./socket/socket.instance");
const pinoHttp = require("pino-http");

const env = require("./config/env.config");
const logger = require("./utils/logger");
const errorHandler = require("./middlewares/error.middleware");

const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
const messageRoutes = require("./routes/message.routes");
const requestContext = require("./middlewares/requestContext.middleware");


const { prisma, connectDatabase } = require("./prisma/client");

const app = express();
const server = http.createServer(app);

/**
 * --------------------------------------------------
 * TRUST PROXY
 * --------------------------------------------------
 */
app.set("trust proxy", 1);

/**
 * --------------------------------------------------
 * SECURITY
 * --------------------------------------------------
 */
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  }),
);

/**
 * --------------------------------------------------
 * RATE LIMITING
 * --------------------------------------------------
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

/**
 * --------------------------------------------------
 * BODY PARSERS
 * --------------------------------------------------
 */
app.use(
  express.json({
    limit: "10kb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  }),
);

/**
 * --------------------------------------------------
 * REQUEST LOGGING
 * --------------------------------------------------
 */
app.use(
  pinoHttp({
    logger,
  }),
);

/**
 * --------------------------------------------------
 * ROUTES
 * --------------------------------------------------
 */
app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(200).json({
      success: true,
      status: "UP",
      database: "CONNECTED",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: env.nodeEnv,
    });
  } catch (error) {
    return res.status(503).json({
      success: false,
      status: "DOWN",
      database: "DISCONNECTED",
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

/**
 * --------------------------------------------------
 * 404
 * --------------------------------------------------
 */
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
initSocket(server, env);

/**
 * --------------------------------------------------
 * ERROR HANDLER
 * --------------------------------------------------
 */
app.use(errorHandler);
app.use(requestContext);

/**
 * --------------------------------------------------
 * SERVER START
 * --------------------------------------------------
 */
const PORT = env.port;

(async () => {
  await connectDatabase();

  server.listen(PORT, () => {
    logger.info(
      {
        port: PORT,
        environment: env.nodeEnv,
      },
      "Server started successfully",
    );
  });
})();

/**
 * --------------------------------------------------
 * GRACEFUL SHUTDOWN
 * --------------------------------------------------
 */
const shutdown = async (signal) => {
  logger.warn({ signal }, "Shutdown initiated");

  try {
    const io = getIO();
    io.close();

    server.close(async () => {
      await prisma.$disconnect();

      logger.info("Database disconnected");

      process.exit(0);
    });

    setTimeout(() => {
      logger.error("Force shutdown");

      process.exit(1);
    }, 10000);
  } catch (error) {
    logger.error(error);

    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));

process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "Unhandled Promise Rejection");
});

process.on("uncaughtException", (error) => {
  logger.fatal(error, "Uncaught Exception");

  process.exit(1);
});
