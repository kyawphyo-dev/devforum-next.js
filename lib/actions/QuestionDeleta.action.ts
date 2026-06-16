"use server";

import mongoose from "mongoose";
import Collection from "@/database/collection.model";
import TagQuestion from "@/database/TagQuestion.model";
import Tag from "@/database/tag.model";
import Question from "@/database/question.model";
import { auth } from "@/auth";
import QuestionDeleteSchema from "../schemas/QuestionDeleteSchema";
import { errorAction } from "../response";
import Answer from "@/database/answer.model";
import Vote from "@/database/vote.model";
import dbConnect from "../dbConnect";

const QuestionDelete = async (params: {
  questionId: string;
}): Promise<{
  success: boolean;
  message?: string;
  details?: object | null;
}> => {
  await dbConnect();
  const validated = QuestionDeleteSchema.safeParse(params);
  if (!validated.success) {
    throw new Error(validated.error.message);
  }

  const { questionId } = validated.data;

  const auth_session = await auth();
  if (!auth_session) {
    throw new Error("Unauthorized");
  }

  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const question = await Question.findById(questionId).session(session);

      if (!question) {
        throw new Error("Question not found");
      }

      // ownership check (IMPORTANT)
      if (question.author.toString() !== auth_session.user.id) {
        throw new Error("Forbidden");
      }

      await Collection.deleteMany({ questionId }).session(session);
      await TagQuestion.deleteMany({ questionId }).session(session);
      const answerIds = await Answer.find({ question: questionId })
        .select("_id")
        .session(session);
      if (answerIds.length > 0) {
        await Vote.deleteMany({
          targetType: "answer",
          targetId: { $in: answerIds },
        }).session(session);
        await Answer.deleteMany({ question: questionId }).session(session);
      }
      if (question.tags.length > 0) {
        await Tag.updateMany(
          { _id: { $in: question.tags } },
          { $inc: { questions: -1 } },
          { session },
        );
      }
      await Vote.deleteMany({
        targetType: "question",
        targetId: questionId,
      }).session(session);

      // ALWAYS delete question
      await Question.deleteOne({ _id: questionId }).session(session);
    });

    return { success: true, message: "Question deleted successfully" };
  } catch (error) {
    return errorAction(error);
  } finally {
    session.endSession();
  }
};

export default QuestionDelete;
