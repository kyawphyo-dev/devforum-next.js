"use server";

import { errorAction } from "../response";
import QuestionDeleteSchema from "../schemas/QuestionDeleteSchema";
import mongoose from "mongoose";

const QuestionDelete = async (params: { questionId: string }) => {
  const validated = QuestionDeleteSchema.safeParse(params);
  if (!validated.success) {
    throw new Error(validated.error.message);
  }
  const { questionId } = validated.data;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
  } catch (error) {
    return errorAction(error);
  }
};
export default QuestionDelete;
