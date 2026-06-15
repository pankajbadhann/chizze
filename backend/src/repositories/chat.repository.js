const { prisma } = require("../prisma/client");

const createChat = async (data) => {
  return prisma.chat.create({
    data,
  });
};

const findChatsByUserId = async (
  userId
) => {
  return prisma.chat.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const findChatByIdAndUserId =
  async (
    chatId,
    userId
  ) => {
    return prisma.chat.findFirst({
      where: {
        id: chatId,
        userId,
      },
    });
  };

module.exports = {
  createChat,
  findChatsByUserId,
  findChatByIdAndUserId,
};