import { Document, model, models, Schema } from "mongoose";

import { Types } from "mongoose";

export type QuestionLean = {
  _id: Types.ObjectId | string;
  title: string;
  content: string;
  tags: ITag[];
  author: IAuthor[];
  answers: IAnswer[];
  createdAt: string;
  updatedAt: string;
  upvotes?: number;
  downvotes?: number;
  answersCount?: number;
  views?: number;
};
interface ITag {
  _id: string;
  name: string;
}

export interface IAnswer {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  content: string;
  upvotes: number;
  downvotes: number;
}

export interface IAuthor {
  _id: string;
  name: string;
  image?: string;
}

export interface IQuestion {
  _id: string;
  title: string;
  content: string;
  tags: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  upvotes: number;
  downvotes: number;
  views: number;
  answersCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IQuestionPopulated extends Omit<IQuestion, "tags"> {
  tags: ITag[];
}

export interface IAuthorPopulated extends Omit<IQuestion, "author"> {
  author: IAuthor[];
}

export interface IPopulatedAll extends Omit<IQuestion, "tags" | "author"> {
  tags: ITag[];

  author: Pick<IAuthor, "_id" | "name" | "image">;

  saved?: boolean;
}

export interface IQuestionDoc extends Omit<IQuestion, "_id">, Document {}

const QuestionSchema = new Schema<IQuestionDoc>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

    views: {
      type: Number,
      default: 0,
    },

    answersCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Question =
  models.Question || model<IQuestionDoc>("Question", QuestionSchema);

export default Question;
