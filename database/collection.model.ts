import { Document, model, models, Schema } from "mongoose";

export interface ICollection {
  userId: Schema.Types.ObjectId;
  questionId: Schema.Types.ObjectId;
}

export interface ICollectionDoc extends ICollection, Document {}

const CollectionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  { timestamps: true },
);

CollectionSchema.index({ userId: 1, questionId: 1 }, { unique: true });

const Collection =
  models?.Collection || model<ICollectionDoc>("Collection", CollectionSchema);

export default Collection;
