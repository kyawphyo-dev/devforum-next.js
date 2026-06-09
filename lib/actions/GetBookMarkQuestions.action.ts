"use server";

import Question, { IPopulatedAll } from "@/database/question.model";
import dbConnect from "../dbConnect";
import PaginateSearchParamSchema from "../schemas/PaginateSearchParams";
import { SortOrder } from "mongoose";
import { errorAction } from "../response";
import Collection, { ICollectionDoc } from "@/database/collection.model";
import { auth } from "@/auth";
import { api } from "../api";

export async function GetBookMarkQuestions(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
}): Promise<{
  data?: {
    collections: ICollectionDoc[];
    questions: IPopulatedAll[];
    isNext?: boolean;
  };
  success: boolean;
  message?: string;
  details?: object | null;
}> {
  //  db connect
  await dbConnect();

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
  //  validate data
  const validated = PaginateSearchParamSchema.safeParse(params);
  if (!validated.success) {
    return errorAction(validated.error);
  }

  const { page = 1, pageSize = 10, search, filter } = validated.data;

  const skip = Number((page - 1) * pageSize); // skip documents
  const limit = Number(pageSize);
  const filterQuery: Record<string, unknown> = { userId: user._id };

  //   implement later on
  //   if (filter === "recommended") {
  //     return { success: true, data: { collections: [], isNext: false } };
  //   }

  if (search) {
    const matchingQuestions = await Question.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ],
    }).select("_id");
    // [{_id:adfasd},{_id:adfasd}]
    const matchingIds = matchingQuestions.map((q) => q._id); //['adfasd,'adafsdf']

    if (!matchingIds.length) {
      return {
        success: true,
        data: { collections: [], questions: [], isNext: false },
      };
    }
    filterQuery.questionId = { $in: matchingIds };
  }

  let sortCriteria: Record<string, SortOrder>;

  switch (filter) {
    case "recent":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "mostvoted":
      sortCriteria = { upvotes: -1 };
      break;
    case "mostanswered":
      sortCriteria = { answers: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalCollections = await Collection.countDocuments(filterQuery);

    const collections = await Collection.find(filterQuery)
      .populate({
        path: "questionId",
        populate: [
          { path: "tags", select: "_id name" },
          { path: "author", select: "_id name image" },
        ],
      })
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit)
      .lean();

    const questions: IPopulatedAll[] = collections
      .map((col) => {
        if (!col.questionId) return null;
        const q = col.questionId as unknown as IPopulatedAll;
        return {
          ...q,
          saved: true,
        };
      })
      .filter((q): q is IPopulatedAll => q !== null);

    const isNext = totalCollections > skip + collections.length;
    return {
      success: true,
      data: {
        collections: JSON.parse(JSON.stringify(collections)),
        questions: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (e) {
    return errorAction(e);
  }
}
