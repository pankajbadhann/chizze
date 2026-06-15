const { z } = require("zod");

const createChatSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title too long"),
});

module.exports = {
  createChatSchema,
};
