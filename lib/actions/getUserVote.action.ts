"use server";
import { auth } from "@/auth";
import Vote from "@/database/vote.model";
import { api } from "../api";
import dbConnect from "../dbConnect";
import { errorAction } from "../response";
import GetUserVoteSchema from "../schemas/GetUserVoteSchema";

interface IGetUerVote {
  targetId: string;
  targetType: "question" | "answer";
}
const getUserVote = async (
  params: IGetUerVote,
): Promise<{
  success: boolean;
  data?: {
    userVote: "upvote" | "downvote" | null;
  };
  message?: string;
  details?: object | null;
}> => {
  await dbConnect();
  const validated = GetUserVoteSchema.safeParse(params);
  if (!validated.success) {
    return errorAction(validated.error.message);
  }
  const { targetId, targetType } = validated.data;

  try {
    // Auth validation
    const auth_session = await auth();
    if (!auth_session?.user?.id) {
      throw new Error("Unauthorized");
    }
    const userEmail = auth_session.user.email || "";
    const response = await api.users.getByEmail(userEmail);

    if (!response || !response.data) {
      throw new Error("User not found");
    }
    const user = response.data;

    const vote = await Vote.findOne({
      targetId,
      targetType,
      userId: user._id,
    });
    return {
      success: true,
      data: {
        userVote: vote?.voteType || null,
      },
    };
  } catch (error) {
    return errorAction(error);
  }
};
export default getUserVote;
