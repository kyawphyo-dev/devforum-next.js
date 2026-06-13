"use server";

import Question, { IQuestionDoc } from "@/database/question.model";
import dbConnect from "../dbConnect";
import PaginateSearchParamSchema from "../schemas/PaginateSearchParams";
import { SortOrder } from "mongoose";
import { errorAction } from "../response";
import Tag from "@/database/tag.model";
import ProfilePaginateSchema from "../schemas/ProfilePaginateSchema";

export async function GetUserAllQuestions(params: {
  userId: string;
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
}): Promise<{
  data?: {
    totalQuestions: number;
    questions: IQuestionDoc[];
    isNext?: boolean;
    currentPage?: number;
    totalPages?: number;
  };
  success: boolean;
  message?: string;
  details?: object | null;
}> {
  // 1. db connect
  await dbConnect();

  // 2. validate data
  const validated = ProfilePaginateSchema.safeParse(params);
  if (!validated.success) {
    return errorAction(validated.error);
  }

  const { page = 1, pageSize = 10, search, filter } = validated.data;

  const skip = Number((page - 1) * pageSize); // skip documents
  const limit = Number(pageSize);
  const filterQuery: Record<string, unknown> = {
    author: params.userId,
  };

  if (search) {
    const regex = new RegExp(search, "i");

    const matchedTags = await Tag.find({
      name: { $regex: regex },
    }).select("_id");

    const tagIds = matchedTags.map((tag) => tag._id);

    filterQuery.$or = [{ title: { $regex: regex } }];
  }

  try {
    const totalQuestions = await Question.countDocuments(filterQuery);
    const questions = await Question.find(filterQuery)
      .lean()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const isNext = totalQuestions > skip + questions.length;
    const totalPages = Math.ceil(totalQuestions / pageSize);
    return {
      success: true,
      data: {
        totalQuestions,
        questions,
        isNext,
        currentPage: page,
        totalPages,
      },
    };
  } catch (e) {
    return errorAction(e);
  }
}
