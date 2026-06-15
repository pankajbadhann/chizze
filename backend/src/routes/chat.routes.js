const express = require("express");

const router = express.Router();

const {
  createChat,
  getChats,
} = require("../controllers/chat.controller");

const validate = require("../middlewares/validate.middleware");

const authMiddleware = require("../middlewares/auth.middleware");

const {
  createChatSchema,
} = require("../validations/chat.validation");

router.use(authMiddleware);

router.get("/", getChats);

router.post(
  "/",
  validate(createChatSchema),
  createChat
);

module.exports = router;