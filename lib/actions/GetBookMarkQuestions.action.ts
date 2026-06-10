"use server";

import mongoose from "mongoose";
import Collection from "@/database/collection.model";
import dbConnect from "../dbConnect";
import { auth } from "@/auth";

import PaginateSearchParamSchema from "../schemas/PaginateSearchParams";
import { errorAction } from "../response";
import { api } from "../api";
import { IPopulatedAll } from "@/database/question.model";

const GetBookMarkQuestions = async (params: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
}): Promise<{
  data?: {
    questions: IPopulatedAll[];
    isNext: boolean;
    totalPages: number;
    currentPage: number;
  };
  success: boolean;
  message?: string;
  details?: object | null;
}> => {
  await dbConnect();
  const auth_session = await auth();
  if (!auth_session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const user = auth_session.user;

  if (!user.id) {
    return {
      success: true,
      data: { questions: [], isNext: false, totalPages: 0, currentPage: 0 },
    };
  }

  const validatedData = PaginateSearchParamSchema.safeParse(params);
  if (!validatedData.success) {
    return errorAction(validatedData.error);
  }

  const { page = 1, pageSize = 10, search, filter } = validatedData.data;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  // Define sort options for all filters
  const sortOptions: Record<string, Record<string, 1 | -1>> = {
    newest: { "question.createdAt": -1 },
    oldest: { "question.createdAt": 1 },
    mostvoted: { "question.upvotes": -1 },
    mostviewed: { "question.views": -1 },
    mostanswered: { "question.answersCount": -1 },
  };

  const sortCriteria = sortOptions[filter || "newest"] || sortOptions.newest;

  try {
    // Build aggregation pipeline
    const pipeline: mongoose.PipelineStage[] = [
      // 1. Match collections for the current user
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user.id),
        },
      },
      // 2. Lookup questions
      {
        $lookup: {
          from: "questions",
          localField: "questionId",
          foreignField: "_id",
          as: "question",
        },
      },
      // 3. Unwind question (remove if question not found)
      { $unwind: "$question" },
      // 4. Lookup author for the question
      {
        $lookup: {
          from: "users",
          localField: "question.author",
          foreignField: "_id",
          as: "question.author",
        },
      },
      // 5. Unwind author
      { $unwind: "$question.author" },
      // 6. Lookup tags for the question
      {
        $lookup: {
          from: "tags",
          localField: "question.tags",
          foreignField: "_id",
          as: "question.tags",
        },
      },
    ];

    // 7. Apply search filter if provided
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { "question.title": { $regex: search, $options: "i" } },
            { "question.content": { $regex: search, $options: "i" } },
          ],
        },
      });
    }

    // 8. Get total count
    const totalCountResult = await Collection.aggregate([
      ...pipeline,
      { $count: "count" },
    ]);
    const totalCollections = totalCountResult[0]?.count || 0;

    // 9. Sort, skip, limit and format
    const results = await Collection.aggregate([
      ...pipeline,
      { $sort: sortCriteria },
      { $skip: skip },
      { $limit: limit },
      {
        $addFields: {
          "question.saved": true,
        },
      },
      {
        $replaceRoot: {
          newRoot: "$question",
        },
      },
    ]);

    const questions = JSON.parse(JSON.stringify(results));
    const isNext = totalCollections > skip + questions.length;
    const totalPages = Math.ceil(totalCollections / pageSize);

    return {
      success: true,
      data: {
        questions,
        isNext,
        totalPages,
        currentPage: Number(page),
      },
    };
  } catch (e) {
    return errorAction(e);
  }
};

export default GetBookMarkQuestions;
