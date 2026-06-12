import dbConnect from "../dbConnect";
import { errorAction } from "../response";
import Answer, { IAnswerLean } from "@/database/answer.model";

const GetUserTopAnswers = async ({
  UserId,
  limit = 5,
}: {
  UserId: string;
  limit?: number;
}): Promise<{
  success: boolean;
  data?: IAnswerLean[];
  message?: string;
  details?: object | null;
}> => {
  await dbConnect();

  try {
    const answers = await Answer.find({ author: UserId })
      .sort({ upvotes: -1, createdAt: -1 }) // top first, fallback by newest
      .limit(limit)
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(answers)),
    };
  } catch (error) {
    return errorAction(error);
  }
};

export default GetUserTopAnswers;
