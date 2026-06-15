const asyncHandler = require("../utils/asyncHandler");

const ApiResponse = require("../utils/apiResponse");

const { getIO } = require("../socket/socket.instance");

const messageService = require("../services/message.service");

const getMessages = asyncHandler(async (req, res) => {
  const messages = await messageService.getMessagesByChat(
    Number(req.params.chatId),
    req.user.id,
    req.query
  );

  return ApiResponse.success(res, "Messages fetched", messages);
});

const postMessage = asyncHandler(async (req, res) => {
  const message = await messageService.createMessage({
    chatId: Number(req.body.chatId),
    userId: req.user.id,
    content: req.body.content,
    position: req.body.position,
  });

  const io = getIO();

  io.to(`chat_${req.body.chatId}`).emit("receive_message", message);

  return ApiResponse.created(res, "Message sent", message);
});

module.exports = {
  getMessages,
  postMessage,
};
