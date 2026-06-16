import z from "zod";

const AnswerDeleteSchema = z.object({
  answerId: z.string(),
});
export default AnswerDeleteSchema;
