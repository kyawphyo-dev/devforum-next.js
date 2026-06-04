import { z } from "zod";

export const CreateAnswerSchema = z.object({
  content: z.string().min(5, {
    message: "Answer content must be at least 5 characters long",
  }),
  questionId: z.string(),
});

export const UpdateAnswerSchema = CreateAnswerSchema.partial();
