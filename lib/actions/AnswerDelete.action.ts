"use server";
import dbConnect from "../dbConnect";
import { errorAction } from "../response";
import AnswerDeleteSchema from "../schemas/AnswerDeleteSchema";
import mongoose from "mongoose";
import { auth } from "@/auth";
import Answer from "@/database/answer.model";
import Vote from "@/database/vote.model";

const AnswerDelete = async (params: {
  answerId: string;
}): Promise<{
  success: boolean;
  message?: string;
  details?: object | null;
}> => {
  await dbConnect();

  const validated = AnswerDeleteSchema.safeParse(params);
  if (!validated.success) {
    return errorAction(validated.error.message);
  }

  const { answerId } = validated.data;

  const auth_session = await auth();
  if (!auth_session) {
    throw new Error("Unauthorized");
  }

  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const answer = await Answer.findById(answerId).session(session);

      if (!answer) {
        throw new Error("Answer not found");
      }

      // delete votes
      await Vote.deleteMany({
        targetType: "answer",
        targetId: answerId,
      }).session(session);

      // delete answer
      await Answer.deleteOne({ _id: answerId }).session(session);
    });

    return {
      success: true,
      message: "Answer deleted successfully",
    };
  } catch (error) {
    return errorAction(error);
  } finally {
    session.endSession();
  }
};

export default AnswerDelete;
