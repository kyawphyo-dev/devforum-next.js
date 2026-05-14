import z from "zod";

export const SignInWithOAuthSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAccountId: z.string(),
  user: z.object({
    email: z.string(),
    name: z.string().min(1, { message: "Name is required" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .optional(),
    image: z
      .string()
      .url({ message: "Image URL must be a valid URL" })
      .optional(),
  }),
});
