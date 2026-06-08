"use server";
import { auth } from "@/auth";
import Collection from "@/database/collection.model";
import Question from "@/database/question.model";
import { api } from "../api";
import dbConnect from "../dbConnect";
import { errorAction } from "../response";
import { CollectionSchema } from "../schemas/CollectionSchema";

const BookMarkAction = async ({
  questionId,
}: {
  questionId: string;
}): Promise<{
  success: boolean;
  data?: {
    saved: boolean;
  };
  message?: string;
  details?: Record<string, string[]> | null;
}> => {
  try {
    await dbConnect();
    const validated = CollectionSchema.safeParse({ questionId });
    if (!validated.success) {
      return errorAction(validated.error);
    }

    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question doesn't exist");

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

    const collection = await Collection.findOne({
      questionId: questionId,
      userId: user._id,
    });

    if (collection) {
      await Collection.findByIdAndDelete(collection._id);
      return {
        success: true,
        data: {
          saved: false,
        },
      };
    }

    await Collection.create({
      questionId,
      userId: user._id,
    });

    return {
      success: true,
      data: {
        saved: true,
      },
    };
  } catch (error) {
    return errorAction(error);
  }
};
export default BookMarkAction;
