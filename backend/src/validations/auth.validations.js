const { z } = require("zod");

const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[a-z]/, "Must contain lowercase letter")
    .regex(/[0-9]/, "Must contain number"),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});

module.exports = {
  registerSchema,
  loginSchema,
};
