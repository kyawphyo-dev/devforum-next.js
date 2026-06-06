"use server";

import { auth } from "@/auth";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import Vote from "@/database/vote.model";
import mongoose from "mongoose";
import { api } from "../api";
import dbConnect from "../dbConnect";
import { errorAction } from "../response";
import VoteActionSchema from "../schemas/VoteActionSchema";

interface IVoteAction {
  targetId: string;
  targetType: "question" | "answer";
  userVote?: "upvote" | "downvote" | null;
}

export default async function VoteAction(params: IVoteAction): Promise<{
  success: boolean;
  data?: {
    upvotes: number;
    downvotes: number;
    userVote: "upvote" | "downvote" | null;
  };
  message?: string;
  details: object | null;
}> {
  //dbconect
  await dbConnect();
  // validate params
  const validated = VoteActionSchema.safeParse(params);
  if (!validated.success) {
    return errorAction(validated.error.message);
  }
  const { targetId, targetType, userVote } = validated.data;

  // start moongoose Session
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
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

    // get target (Questin or Answer)
    const Model = targetType === "question" ? Question : Answer;
    const target = await Model.findById(targetId).session(session);
    if (!target) throw new Error("Target not found");

    const existingVote = await Vote.findOne({
      userId: user._id,
      targetId,
      targetType,
    }).session(session);

    let newUpvotes = target.upvotes || 0;
    let newDownvotes = target.downvotes || 0;
    let newUserVote: "upvote" | "downvote" | null = null;
    if (existingVote) {
      // If user already voted, handle toggle/change
      if (existingVote.voteType === userVote) {
        // Same vote type clicked - remove the vote
        if (userVote === "upvote") {
          newUpvotes = Math.max(0, newUpvotes - 1);
        } else {
          newDownvotes = Math.max(0, newDownvotes - 1);
        }
        await Vote.findByIdAndDelete(existingVote._id).session(session);
        newUserVote = null;
      } else {
        // Different vote type - switch the vote
        if (existingVote.voteType === "upvote") {
          newUpvotes = Math.max(0, newUpvotes - 1);
          newDownvotes += 1;
        } else {
          newDownvotes = Math.max(0, newDownvotes - 1);
          newUpvotes += 1;
        }
        existingVote.voteType = userVote;
        await existingVote.save({ session });
        newUserVote = userVote;
      }
    } else {
      // New vote
      await Vote.create(
        [
          {
            userId: user._id,
            targetId,
            targetType,
            voteType: userVote,
          },
        ],
        { session },
      );
      if (userVote === "upvote") {
        newUpvotes += 1;
      } else {
        newDownvotes += 1;
      }
      newUserVote = userVote;
    }

    // Update the item's vote counts
    target.upvotes = newUpvotes;
    target.downvotes = newDownvotes;
    await target.save({ session });

    await session.commitTransaction();

    return {
      success: true,
      details: null,
      data: {
        upvotes: newUpvotes,
        downvotes: newDownvotes,
        userVote: newUserVote,
      },
    };
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT")
      throw error;

    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    return errorAction(error);
  } finally {
    session.endSession();
  }
}
