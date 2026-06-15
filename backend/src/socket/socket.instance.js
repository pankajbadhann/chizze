const { Server } = require("socket.io");
const { verifyToken } = require("../utils/jwt");
const logger = require("../utils/logger");
const chatRepo = require("../repositories/chat.repository");
const socketAsyncHandler = require("../utils/socketAsyncHandler");

let ioInstance = null;

/**
 * --------------------------------------------------
 * SOCKET AUTHENTICATION MIDDLEWARE
 * --------------------------------------------------
 */
const socketAuthMiddleware = (socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.split(" ")[1];

    if (!token) {
      return next(new Error("Authentication required"));
    }

    const decoded = verifyToken(token);

    if (!decoded?.userId) {
      return next(new Error("Invalid token"));
    }

    socket.user = {
      id: decoded.userId,
    };

    return next();
  } catch (error) {
    logger.warn({
      message: "Socket auth failed",
      error: error.message,
    });

    return next(new Error("Unauthorized"));
  }
};

/**
 * --------------------------------------------------
 * INIT SOCKET.IO
 * --------------------------------------------------
 */
const initSocket = (server, env) => {
  ioInstance = new Server(server, {
    cors: {
      origin: env.corsOrigin,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  /**
   * Attach auth middleware
   */
  ioInstance.use(socketAuthMiddleware);

  ioInstance.on("connection", (socket) => {
    logger.info(
      {
        socketId: socket.id,
        userId: socket.user.id,
      },
      "Socket connected",
    );

    /**
     * JOIN CHAT (SECURE)
     */
    socket.on("join_chat", async (chatId) => {
      try {
        const chat = await chatRepo.findChatByIdAndUserId(
          Number(chatId),
          socket.user.id,
        );

        if (!chat) {
          socket.emit("error", {
            message: "Chat not found",
          });

          return;
        }

        socket.join(`chat_${chatId}`);

        logger.info(
          {
            userId: socket.user.id,
            chatId,
          },
          "User joined chat room",
        );
      } catch (error) {
        logger.error(error);

        socket.emit("error", {
          message: "Failed to join room",
        });
      }
    });

    /**
     * SEND MESSAGE
     */
    socket.on("send_message", async (data) => {
      try {
        const chatId = Number(data.chatId);

        if (!chatId) {
          return socket.emit("error", {
            message: "Invalid chat id",
          });
        }

        if (!data.content || typeof data.content !== "string") {
          return socket.emit("error", {
            message: "Message content required",
          });
        }

        const chat = await chatRepo.findChatByIdAndUserId(
          chatId,
          socket.user.id,
        );

        if (!chat) {
          return socket.emit("error", {
            message: "Chat not found",
          });
        }

        const message = await messageRepo.createMessage({
          chatId,
          userId: socket.user.id,
          content: data.content.trim(),
          position: data.position || null,
        });

        ioInstance.to(`chat_${chatId}`).emit("receive_message", message);
      } catch (error) {
        logger.error(error);

        socket.emit("error", {
          message: "Failed to send message",
        });
      }
    });

    /**
     * DISCONNECT
     */
    socket.on("disconnect", () => {
      logger.info(
        {
          socketId: socket.id,
          userId: socket.user.id,
        },
        "Socket disconnected",
      );
    });
  });

  return ioInstance;
};

/**
 * --------------------------------------------------
 * GET IO INSTANCE
 * --------------------------------------------------
 */
const getIO = () => {
  if (!ioInstance) {
    throw new Error("Socket.io not initialized");
  }
  return ioInstance;
};

module.exports = {
  initSocket,
  getIO,
};
