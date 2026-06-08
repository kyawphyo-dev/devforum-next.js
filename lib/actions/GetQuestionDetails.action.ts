"use server";
import { auth } from "@/auth";
import Collection from "@/database/collection.model";
import Question, { IPopulatedAll } from "@/database/question.model";
import "@/database/tag.model";
import dbConnect from "@/lib/dbConnect";
import { api } from "../api";
import { errorAction } from "../response";
import { GetQuestionSchema } from "../schemas/GetQuestionSchema";

export async function GetQuestionDetails(params: {
  questionId: string;
}): Promise<{
  success: boolean;
  message?: string;
  data?: IPopulatedAll;
}> {
  // 1. validate data with zod
  const validated = GetQuestionSchema.safeParse(params);
  if (!validated.success) {
    return errorAction(validated.error);
  }
  const { questionId } = validated.data;

  try {
    // 2. db connect
    await dbConnect();

    // 3. find question
    const question = await Question.findById(questionId)
      .populate("tags", " name")
      .populate("author", "name image")
      .lean();
    if (!question) {
      throw new Error("Question not found");
    }

    // Auth
    const auth_session = await auth();
    let saved = false;

    if (auth_session?.user?.id) {
      const userEmail = auth_session.user.email || "";
      const response = await api.users.getByEmail(userEmail);

      if (response && response.data) {
        const user = response.data;
        // Get Collection
        const collection = await Collection.findOne({
          questionId,
          userId: user._id,
        }).lean();
        saved = !!collection;
      }
    }

    // 4. Return serialized question data
    return {
      success: true,
      data: { ...JSON.parse(JSON.stringify(question)), saved },
    };
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT")
      throw error;

    console.error("GetQuestion error:", error);
    return errorAction(error);
  }
}
