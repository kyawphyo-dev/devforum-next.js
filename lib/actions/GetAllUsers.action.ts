"use server";

import Question, { IQuestionDoc } from "@/database/question.model";
import dbConnect from "../dbConnect";
import PaginateSearchParamSchema from "../schemas/PaginateSearchParams";
import { SortOrder } from "mongoose";
import { errorAction } from "../response";
import Tag from "@/database/tag.model";
import User, { IUserDoc } from "@/database/user.model";

export async function GetAllUsers(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
}): Promise<{
  data?: {
    users: IUserDoc[];
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

  const { page = 1, pageSize = 15, search, filter } = validated.data;

  const skip = Number((page - 1) * pageSize); // skip documents
  const limit = Number(pageSize);
  const filterQuery: Record<string, unknown> = {};

  if (search) {
    const regex = new RegExp(search, "i");

    filterQuery.$or = [
      { name: { $regex: regex } },
      { username: { $regex: regex } },
      { location: { $regex: regex } },
      { email: { $regex: regex } },
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
    case "reputation":
      sortCriteria = { reputation: -1 };
      break;
    default:
      sortCriteria = { reputation: -1 };
      break;
  }

  try {
    const totalUsers = await User.countDocuments(filterQuery);
    const users = await User.find(filterQuery)
      .lean()
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalUsers > skip + users.length;
    const totalPages = Math.ceil(totalUsers / pageSize);
    return {
      success: true,
      data: {
        users,
        isNext,
        currentPage: page,
        totalPages,
      },
    };
  } catch (e) {
    return errorAction(e);
  }
}
