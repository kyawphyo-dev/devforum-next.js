import { z } from "zod";

export const IncrementViewsSchema = z.object({
  questionId: z.string(),
});
