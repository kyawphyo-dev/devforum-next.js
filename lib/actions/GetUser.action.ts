import User, { IUserDoc } from "@/database/user.model";
import { errorAction } from "../response";
import dbConnect from "../dbConnect";
import GetUserSchema from "../schemas/GetUserSchema";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";

const GetUser = async ({
  UserId,
}: {
  UserId: string;
}): Promise<{
  success: boolean;
  data?: {
    user: IUserDoc;
    totalQuestions: number;
    totalAnswers: number;
  };
  message?: string;
  details?: object | null;
}> => {
  await dbConnect();
  const validated = await GetUserSchema.safeParse({ UserId });
  if (!validated.success) {
    return errorAction(validated.error);
  }

  try {
    const user = await User.findById(UserId);
    if (!user) throw new Error("User not found");
    const [totalQuestions, totalAnswers] = await Promise.all([
      Question.countDocuments({ author: UserId }),
      Answer.countDocuments({ author: UserId }),
    ]);
    console.log("GetUser", user, totalAnswers, totalQuestions);
    return {
      success: true,
      data: {
        user,
        totalQuestions,
        totalAnswers,
      },
    };
  } catch (error) {
    return errorAction(error);
  }
};
export default GetUser;
