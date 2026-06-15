ioInstance.on("connection", (socket) => {
  logger.info(
    {
      socketId: socket.id,
      userId: socket.user.id,
    },
    "Socket connected",
  );

  /**
   * IMPORTANT: USER ROOM (NEW)
   * Each user gets their own private channel
   */
  socket.join(`user_${socket.user.id}`);

  /**
   * JOIN CHAT
   */
  socket.on("join_chat", (chatId) => {
    socket.join(`chat_${chatId}`);
  });

  /**
   * SEND MESSAGE (FIXED SCALABLE VERSION)
   */
  socket.on("send_message", async (data) => {
    try {
      const chatId = Number(data.chatId);

      const payload = {
        ...data,
        userId: socket.user.id,
        createdAt: new Date().toISOString(),
      };

      /**
       * 1. CHAT ROOM BROADCAST
       */
      ioInstance.to(`chat_${chatId}`).emit("receive_message", payload);

      /**
       * 2. USER-BASED UPDATE (IMPORTANT FIX)
       * Instead of global emit, send to users only
       */
      const chatUpdate = await chatRepo.findChatByIdAndUserId(
        chatId,
        socket.user.id,
      );
      /**
       * Only notify sender (safe baseline)
       * Later we will expand to chat participants
       */
      ioInstance.to(`user_${socket.user.id}`).emit("chat_updated", chatUpdate);
    } catch (err) {
      logger.error(err, "send_message failed");
    }
  });

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
