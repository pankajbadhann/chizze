const asyncHandler = require("../utils/asyncHandler");

const ApiResponse = require("../utils/apiResponse");

const chatService = require("../services/chat.service");

const createChat = asyncHandler(
  async (req, res) => {
    const chat =
      await chatService.createChat({
        title: req.body.title,
        userId: req.user.id,
      });

    return ApiResponse.created(
      res,
      "Chat created",
      chat
    );
  }
);

const getChats = asyncHandler(
  async (req, res) => {
    const chats =
      await chatService.getChats(
        req.user.id
      );

    return ApiResponse.success(
      res,
      "Chats fetched",
      chats
    );
  }
);

module.exports = {
  createChat,
  getChats,
};