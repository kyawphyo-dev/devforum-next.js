import dbConnect from "../dbConnect";
import Question, { QuestionLean } from "@/database/question.model";
import { errorAction } from "../response";

const GetUserTopQuestions = async ({
  UserId,
  limit = 5,
}: {
  UserId: string;
  limit?: number;
}): Promise<{
  success: boolean;
  data?: QuestionLean[];
  message?: string;
  details?: object | null;
}> => {
  await dbConnect();

  try {
    const questions = await Question.find({ author: UserId })
      .sort({ upvotes: -1, answersCount: -1, createdAt: -1 }) // top first, fallback by newest
      .limit(limit)
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(questions)),
    };
  } catch (error) {
    return errorAction(error);
  }
};

export default GetUserTopQuestions;
