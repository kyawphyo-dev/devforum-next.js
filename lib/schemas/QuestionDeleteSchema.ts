import z from "zod";

const QuestionDeleteSchema = z.object({
  questionId: z.string(),
});
export default QuestionDeleteSchema;
