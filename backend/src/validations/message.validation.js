const { z } = require("zod");

const createMessageSchema = z.object({
  chatId: z.coerce.number().int().positive(),

  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .max(5000, "Message too long"),

  position: z
    .string()
    .trim()
    .max(100)
    .optional(),
});

module.exports = {
  createMessageSchema,
};