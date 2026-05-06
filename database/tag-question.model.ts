import { Schema, Document, models, model } from "mongoose";

export interface ITagQuestion {
  tag: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
}

export interface ITagQuestionDoc extends ITagQuestion, Document {}

const TagQuestionSchema = new Schema(
  {
    tag: {
      type: Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  { timestamps: true },
);

TagQuestionSchema.index({ tag: 1, question: 1 }, { unique: true });

const TagQuestion =
  models?.TagQuestion ||
  model<ITagQuestionDoc>("TagQuestion", TagQuestionSchema);

export default TagQuestion;
