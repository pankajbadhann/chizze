const messageRepo = require("../repositories/message.repository");

const chatRepo = require("../repositories/chat.repository");

const messageRepo = require("../repositories/message.repository");

const createMessage = async ({ chatId, userId, content, position }) => {
  const chat = await chatRepo.findChatByIdAndUserId(chatId, userId);

  if (!chat) {
    const error = new Error("Chat not found");
    error.statusCode = 404;
    throw error;
  }

  const message = await messageRepo.createMessage({
    chatId,
    userId,
    content,
    position,
  });

  /**
   * IMPORTANT: UPDATE CHAT LAST MESSAGE
   */
  await chatRepo.updateLastMessage(chatId, content);

  return message;
};

const createMessage = async ({ chatId, userId, content, position }) => {
  const chat = await chatRepo.findChatByIdAndUserId(chatId, userId);

  if (!chat) {
    const error = new Error("Chat not found");

    error.statusCode = 404;

    throw error;
  }

  return messageRepo.createMessage({
    chatId,
    userId,
    content,
    position,
  });
};

const getMessagesByChat = async (chatId, userId, query = {}) => {
  const chat = await chatRepo.findChatByIdAndUserId(chatId, userId);

  if (!chat) {
    const error = new Error("Chat not found");
    error.statusCode = 404;
    throw error;
  }

  const limit = Math.min(Math.max(Number(query.limit) || 20, 1), 100);

  const offset = Math.max(Number(query.offset) || 0, 0);

  return messageRepo.findMessagesByChatId({
    chatId,
    limit,
    offset,
  });
};

module.exports = {
  createMessage,
  getMessagesByChat,
};
