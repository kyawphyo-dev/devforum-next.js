import { Schema, Document, models, model } from "mongoose";

export interface IAnswer {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  content: string;
  upvotes: number;
  downvotes: number;
}

export interface IAnswerDoc extends IAnswer, Document {}

export interface IAnswerAuthor {
  name: string;
  email?: string;
  image?: string;
}

export interface IPopulatedAnswer {
  _id: string;
  content: string;
  upvotes: number;
  downvotes: number;
  author: IAnswerAuthor;
  createdAt: string;
  updatedAt: string;
}

const AnswerSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Answer = models?.Answer || model<IAnswerDoc>("Answer", AnswerSchema);

export default Answer;
