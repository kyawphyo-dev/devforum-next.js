"use server";

import dbConnect from "../dbConnect";
import { errorAction } from "../response";
import Answer, { IPopulatedAnswer } from "@/database/answer.model";
import GetAnswerSchema from "../schemas/GetAnswerSchema";
import { SortOrder } from "mongoose";

export async function GetAnswers(params: {
  questionId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
}): Promise<{
  data?: {
    answers: IPopulatedAnswer[];
    totalAnswers: number;
    isNext: boolean;
  };
  success: boolean;
  message?: string;
  details?: object | null;
}> {
  // 1. db connect
  await dbConnect();

  // 2. validate data
  const validated = GetAnswerSchema.safeParse(params);
  if (!validated.success) {
    return errorAction(validated.error);
  }

  const { questionId, page = 1, pageSize = 10, filter } = validated.data;
  const skip = Number((page - 1) * pageSize);
  const limit = Number(pageSize);

  let sortCriteria: Record<string, SortOrder>;

  switch (filter) {
    case "newest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { upvotes: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalAnswers = await Answer.countDocuments({ question: questionId });
    const answers = await Answer.find({ question: questionId })
      .populate("author", "name email image")
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = answers.length >= limit;

    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        totalAnswers,
        isNext,
      },
    };
  } catch (e) {
    return errorAction(e);
  }
}
