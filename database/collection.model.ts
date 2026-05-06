import { Schema, Document, models, model } from "mongoose";

export interface ICollection {
  user: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
}

export interface ICollectionDoc extends ICollection, Document {}

const CollectionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

CollectionSchema.index({ user: 1, question: 1 }, { unique: true });

const Collection =
  models?.Collection || model<ICollectionDoc>("Collection", CollectionSchema);

export default Collection;
