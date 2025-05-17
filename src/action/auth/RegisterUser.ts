"use server";

import dbConnect from "@/lib/dbConnection";
import { userRegisterSchema } from "@/lib/validations/userRegisterSchema";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

interface RegisterResponse {
  message: string;
  status?: number;
}

export const registerUser = async (payload: unknown): Promise<RegisterResponse> => {
  // ✅ Validate payload with Zod
  const parsed = userRegisterSchema.safeParse(payload);
  if (!parsed.success) {
    const errorMessage = parsed.error.errors[0].message;
    return { message: errorMessage, status: 400 };
  }

  const { name, email, password } = parsed.data;

  try {
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { message: "User already exists!", status: 409 };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return { message: "User created successfully", status: 201 };
  } catch (err) {
    console.error("Registration error:", err);
    return { message: "Something went wrong", status: 500 };
  }
};
