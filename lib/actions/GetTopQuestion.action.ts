import Question, { IQuestionDoc } from "@/database/question.model";
import dbConnect from "../dbConnect";
import { errorAction } from "../response";

const GetTopQuestions = async (): Promise<{
  success: boolean;
  data?: {
    topQuestions: IQuestionDoc[];
  };
  error?: string;
}> => {
  try {
    await dbConnect();

    const topQuestions = await Question.find().sort({ views: -1 }).limit(5);

    return {
      success: true,
      data: {
        topQuestions,
      },
    };
  } catch (error) {
    return errorAction(error);
  }
};

export default GetTopQuestions;
