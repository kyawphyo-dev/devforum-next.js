import { Schema, Document, models, model } from "mongoose";

export interface IVote {
  user: Schema.Types.ObjectId;
  questionId?: Schema.Types.ObjectId;
  answerId?: Schema.Types.ObjectId;
  voteType: "upvote" | "downvote";
}

export interface IVoteDoc extends IVote, Document {}

const VoteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    answerId: {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
    voteType: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
  },
  { timestamps: true },
);

// Prevent duplicate votes by the same user on the same question or answer
VoteSchema.index({ user: 1, question: 1 }, { unique: true, sparse: true });
VoteSchema.index({ user: 1, answer: 1 }, { unique: true, sparse: true });

const Vote = models?.Vote || model<IVoteDoc>("Vote", VoteSchema);

export default Vote;
