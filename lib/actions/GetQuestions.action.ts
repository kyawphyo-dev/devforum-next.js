"use server";

import Question, { IQuestionDoc } from "@/database/question.model";
import dbConnect from "../dbConnect";
import PaginateSearchParamSchema from "../schemas/PaginateSearchParams";
import { SortOrder } from "mongoose";
import { errorAction } from "../response";
import Tag from "@/database/tag.model";

export async function GetQuestions(params: {
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
  const validated = PaginateSearchParamSchema.safeParse(params);
  if (!validated.success) {
    return errorAction(validated.error);
  }

  const { page = 1, pageSize = 10, search, filter } = validated.data;

  const skip = Number((page - 1) * pageSize); // skip documents
  const limit = Number(pageSize);
  const filterQuery: Record<string, unknown> = {};

  //implement later on
  if (filter === "recommended") {
    return {
      success: true,
      data: {
        questions: [],
        isNext: false,
        currentPage: page,
        totalPages: 0,
        totalQuestions: 0,
      },
    };
  }

  if (search) {
    const regex = new RegExp(search, "i");

    const matchedTags = await Tag.find({
      name: { $regex: regex },
    }).select("_id");

    const tagIds = matchedTags.map((tag) => tag._id);

    filterQuery.$or = [
      { title: { $regex: regex } },
      { content: { $regex: regex } },
      { tags: { $in: tagIds } },
    ];
  }

  let sortCriteria: Record<string, SortOrder>;

  switch (filter) {
    case "newest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "mostvoted":
      sortCriteria = { votes: -1 };
      break;
    case "mostanswered":
      sortCriteria = { answersCount: -1 };
      break;
    case "unanswered":
      filterQuery.$or = [
        { answersCount: { $lte: 0 } },
        { answersCount: { $exists: false } },
      ];
      sortCriteria = { createdAt: -1 };
      break;
    case "popular":
      sortCriteria = { views: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalQuestions = await Question.countDocuments(filterQuery);
    const questions = await Question.find(filterQuery)
      .populate("tags", "name")
      .populate("author", "name image")
      .lean()
      .sort(sortCriteria)
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
