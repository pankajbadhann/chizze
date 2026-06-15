const chatRepo = require("../repositories/chat.repository");

const createChat = async ({
  title,
  userId,
}) => {
  return chatRepo.createChat({
    title,
    userId,
  });
};

const getChats = async (userId) => {
  return chatRepo.findChatsByUserId(
    userId
  );
};

module.exports = {
  createChat,
  getChats,
};