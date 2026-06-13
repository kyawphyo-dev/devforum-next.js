"use server";

import dbConnect from "../dbConnect";
import { errorAction } from "../response";
import Tag from "@/database/tag.model";
import ProfilePaginateSchema from "../schemas/ProfilePaginateSchema";
import Answer, { IAnswerDoc } from "@/database/answer.model";

export async function GetUserAllAnswers(params: {
  userId: string;
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
}): Promise<{
  data?: {
    totalAnswers: number;
    answers: IAnswerDoc[];
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
    const totalAnswers = await Answer.countDocuments(filterQuery);
    const answers = await Answer.find(filterQuery)
      .lean()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const isNext = totalAnswers > skip + answers.length;
    const totalPages = Math.ceil(totalAnswers / pageSize);
    return {
      success: true,
      data: {
        totalAnswers,
        answers,
        isNext,
        currentPage: page,
        totalPages,
      },
    };
  } catch (e) {
    return errorAction(e);
  }
}
