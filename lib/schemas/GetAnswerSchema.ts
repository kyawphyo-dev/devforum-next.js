import z from "zod";

const GetAnswerSchema = z.object({
  questionId: z.string(),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).default(10),
  filter: z.string().optional(),
});
export default GetAnswerSchema;
