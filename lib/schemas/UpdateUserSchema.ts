// app/lib/schemas/UpdateUserSchema.ts
import { z } from "zod";

export const UpdateUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  updates: z.object({
    name: z.string().min(1, "Name is required").optional(),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .optional(),
    email: z.string().email("Invalid email address").optional(),
    bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
    image: z.string().url("Invalid image URL").optional(),
    location: z.string().max(100, "Location is too long").optional(),
    portfolio: z.string().url("Invalid portfolio URL").optional(),
  }),
});
