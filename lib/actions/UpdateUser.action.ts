// app/lib/actions/UpdateUser.action.ts
"use server";

import { auth } from "@/auth";
import User from "@/database/user.model";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import { errorAction } from "../response";
import { UpdateUserSchema } from "../schemas/UpdateUserSchema";
import { IUser } from "@/database/user.model";

export async function UpdateUser(params: {
  userId: string;
  updates: Partial<IUser>;
}): Promise<{
  success: boolean;
  message?: string;
  data?: IUser;
}> {
  //  Validate input with Zod
  const validated = UpdateUserSchema.safeParse(params);
  if (!validated.success) {
    return errorAction(validated.error.message);
  }

  const { userId, updates } = validated.data;
  let session: mongoose.ClientSession | null = null;

  try {
    // Connect to database
    await dbConnect();

    //  Start transaction
    session = await mongoose.startSession();
    session.startTransaction();

    //  Authentication check
    const authSession = await auth();
    if (!authSession?.user?.id) {
      throw new Error("Unauthorized");
    }

    // 5. Authorization: only the user themselves or an admin can update
    if (authSession.user.id !== userId) {
      throw new Error("Forbidden: you can only update your own profile");
    }

    // 6. Fetch the user to check provider
    const existingUser = await User.findById(userId).session(session);
    if (!existingUser) {
      throw new Error("User not found");
    }

    // Email Update restrictions (Only user with 'credential' provider can change email)
    if (existingUser.email !== updates.email) {
      if (existingUser.provider !== "credential") {
        throw new Error(
          "Cannot change email for accounts linked to external providers (Google, GitHub, etc.)",
        );
      }
      const existingEmail = await User.findOne({
        email: updates.email,
      }).session(session);
      if (existingEmail) {
        throw new Error("Email already in use");
      }
      existingUser.email = updates.email;
    }

    // check username uniqueness
    if (existingUser.username !== updates.username) {
      const existingUsername = await User.findOne({
        username: updates.username,
      }).session(session);
      if (existingUsername) {
        throw new Error("Username already in use");
      }
      existingUser.username = updates.username;
    }

    Object.assign(existingUser, {
      name: updates.name,
      bio: updates.bio,
      image: updates.image,
      location: updates.location,
      portfolio: updates.portfolio,
    });

    await existingUser.save({ session });
    await session.commitTransaction();

    const serializedUser = JSON.parse(JSON.stringify(existingUser));
    return {
      success: true,
      data: serializedUser,
    };
  } catch (error) {
    if (session && session.inTransaction()) {
      await session.abortTransaction();
    }
    console.error("UpdateUser error:", error);
    return errorAction(error);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
}
