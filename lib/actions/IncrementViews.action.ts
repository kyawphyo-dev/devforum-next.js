"use server";
import Question from "@/database/question.model";
import { errorAction } from "../response";
import { IncrementViewsSchema } from "../schemas/IncrementViewsSchema";

const IncrementViews = async (params: {
  questionId: string;
}): Promise<{
  success: boolean;
  data?: { views: number };
  message?: string;
  details?: object | null;
}> => {
  const validated = IncrementViewsSchema.safeParse(params);
  if (!validated.success) {
    return errorAction(validated.error);
  }
  const { questionId } = validated.data;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error("Question not found");
    }
    question.views += 1;
    await question.save();
    return {
      success: true,
      data: {
        views: question.views,
      },
    };
  } catch (error) {
    return errorAction(error);
  }
};

export default IncrementViews;
