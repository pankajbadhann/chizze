const { prisma } = require("../prisma/client");

const createUser = (data) =>
  prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });

const findUserByEmail = (email) =>
  prisma.user.findUnique({
    where: { email },
  });

module.exports = {
  createUser,
  findUserByEmail,
};
