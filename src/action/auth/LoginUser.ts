"use server";

import dbConnect from "@/lib/dbConnection";
import { User } from "@/models/User";
import bcrypt from "bcrypt";
import { userLoginSchema } from "@/lib/validations/userLoginSchema";

export const loginUser = async (payload: unknown) => {
  // ✅ Zod validation
  const parsed = userLoginSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { email, password } = parsed.data;

  try {
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return { error: "Invalid email or password" };
    }

    const isPasswordOk = await bcrypt.compare(password, user.password);
    if (!isPasswordOk) {
      return { error: "Invalid email or password" };
    }

    return user ;
  } catch (err) {
    console.error("Login error:", err);
    return { error: "Server error, please try again later" };
  }
};
