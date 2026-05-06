import { Schema, Document, models, model } from "mongoose";

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  provider: string;
  providerId: string;
  bio?: string;
  image: string;
  role: string;
  location?: string;
  portfolio?: string;
  reputation: number;
}

export interface IUserDoc extends IUser, Document {}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    portfolio: {
      type: String,
    },
    reputation: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const User = models?.User || model<IUserDoc>("User", UserSchema);

export default User;
