const express = require("express");

const router = express.Router();

const {
  getMessages,
  postMessage,
} = require("../controllers/message.controller");

const validate = require("../middlewares/validate.middleware");

const authMiddleware = require("../middlewares/auth.middleware");

const {
  createMessageSchema,
} = require("../validations/message.validation");

router.use(authMiddleware);

router.get("/:chatId", getMessages);

router.post(
  "/",
  validate(createMessageSchema),
  postMessage
);

module.exports = router;