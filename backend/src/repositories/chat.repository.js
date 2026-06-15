const { prisma } = require("../prisma/client");

const createChat = async (data) => {
  return prisma.chat.create({
    data,
  });
};

const findChatsByUserId = async (userId) => {
  return prisma.chat.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const findChatByIdAndUserId = async (chatId, userId) => {
  return prisma.chat.findFirst({
    where: {
      id: chatId,
      userId,
    },
  });
};

const updateLastMessage = async (chatId, lastMessage) => {
  return prisma.chat.update({
    where: { id: chatId },
    data: {
      lastMessage,
      updatedAt: new Date(),
    },
  });
};

module.exports = {
  createChat,
  findChatsByUserId,
  findChatByIdAndUserId,
  updateLastMessage,
};
