import {z} from "zod";
export const GenerateAiAnswerSchema = z.object({
    questionContent: z.string().min(1, {
        message: "Question content is required",
    }),
    questionTitle: z.string().min(1, {
        message: "Question title is required",
    }),
    answerContent: z.string().min(1, {
        message: "Answer content is required",
    }),
});