const { prisma } = require("../prisma/client");

/**
 * --------------------------------------------------
 * CREATE MESSAGE
 * --------------------------------------------------
 */
const createMessage = async (data) => {
  return prisma.message.create({
    data,
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
};

/**
 * --------------------------------------------------
 * PAGINATED MESSAGE FETCH (PRODUCTION READY)
 * --------------------------------------------------
 * Supports:
 * - limit (page size)
 * - cursor (optional future upgrade)
 * - offset (fallback pagination)
 */
const findMessagesByChatId = async ({ chatId, limit = 20, offset = 0 }) => {
  return prisma.message.findMany({
    where: {
      chatId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    skip: offset,
    select: {
      id: true,
      content: true,
      position: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
};

module.exports = {
  createMessage,
  findMessagesByChatId,
};
