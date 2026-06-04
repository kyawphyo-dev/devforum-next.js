"use server";
import { auth } from "@/auth";
import Question from "@/database/question.model";
import dbConnect from "@/lib/dbConnect";
import { errorAction } from "../response";
import { CreateAnswerSchema } from "../schemas/CreateAnswerSchema";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import Answer, { IAnswerDoc } from "@/database/answer.model";
import { api } from "../api";
import ROUTES from "@/routes";

export async function CreateAnswer(params: {
  questionId: string;
  content: string;
}): Promise<{
  success: boolean;
  message?: string;
  data?: IAnswerDoc;
}> {
  console.log(
    "CreateAnswer Server Action - RECEIVED PARAMS:",
    JSON.stringify(params, null, 2),
  );

  // 1. validate data with zod
  const validated = CreateAnswerSchema.safeParse(params);
  if (!validated.success) {
    console.error(
      "CreateAnswer Server Action - VALIDATION FAILED:",
      validated.error.flatten().fieldErrors,
    );
    return errorAction(validated.error);
  }

  const { questionId, content } = validated.data;
  let session;
  try {
    // 2. db connect
    await dbConnect();

    // 3. start session
    session = await mongoose.startSession();
    session.startTransaction();

    // 4. Auth validation
    const auth_session = await auth();
    if (!auth_session?.user?.id) {
      throw new Error("Unauthorized");
    }
    const userEmail = auth_session.user.email || "";
    const response = await api.users.getByEmail(userEmail);

    if (!response || !response.data) {
      throw new Error("User not found");
    }

    const dbUser = response.data;

    const question = await Question.findById(questionId).session(session);
    if (!question) throw new Error("Question not found");

    // 5. Create Answer
    const [answer] = await Answer.create(
      [
        {
          content,
          author: dbUser._id,
          question: question._id,
        },
      ],
      { session },
    );
    console.log(answer);
    if (!answer) {
      throw new Error("Failed to create a answer");
    }

    // 6. Increment question answers count and cleanup old answers array if exists
    await Question.findByIdAndUpdate(
      questionId,
      { $inc: { answersCount: 1 }, $unset: { answers: 1 } },
      { session },
    );

    // 7. Commit transaction
    await session.commitTransaction();

    revalidatePath(ROUTES.QUESTION_DETAILS(questionId));

    // 8. Return serialized answer data
    return {
      success: true,
      data: JSON.parse(JSON.stringify(answer)),
    };
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT")
      throw error;

    if (session && session.inTransaction()) {
      await session.abortTransaction();
    }
    // console.error("CreateAnswer error:", error);
    return errorAction(error);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
}
