import { Schema, Document, models, model } from "mongoose";

export interface IVote {
  userId: Schema.Types.ObjectId;
  targetId: Schema.Types.ObjectId;
  targetType: "question" | "answer";
  voteType: "upvote" | "downvote";
}

export interface IVoteDoc extends Document, IVote {}

const VoteSchema = new Schema<IVoteDoc>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    targetType: {
      type: String,
      enum: ["question", "answer"],
      required: true,
    },

    voteType: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate votes from the same user
VoteSchema.index(
  {
    userId: 1,
    targetId: 1,
    targetType: 1,
  },
  {
    unique: true,
  }
);

const Vote =
  models.Vote || model<IVoteDoc>("Vote", VoteSchema);

export default Vote;