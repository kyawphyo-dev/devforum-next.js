import { Schema, Document, models, model } from "mongoose";

export interface Itag {
  name: string;
  description: string;
}

export interface ITagDoc extends Itag, Document {}

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Tag = models?.Tag || model<ITagDoc>("Tag", TagSchema);

export default Tag;
