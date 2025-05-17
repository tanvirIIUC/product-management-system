"use server";

import dbConnect from "@/lib/dbConnection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import '@/models/User';
import { Product } from "@/models/Product";

export const getProducts = async (page: number = 1, limit: number = 10) => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { error: "Unauthorized", data: [], totalPages: 0, page: 1 };
    }

    const skip = (page - 1) * limit;
    const total = await Product.countDocuments();

    const data = await Product.find()
      .populate({ path: "user", select: "-password -__v -updatedAt" })
      .skip(skip)
      .limit(limit);

    return {
      data: JSON.parse(JSON.stringify(data)),
      totalPages: Math.ceil(total / limit),
      page,
    };
  } catch (error: unknown) {
    console.error("Failed to fetch products:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { error: errorMessage, data: [], totalPages: 0, page: 1 };
  }
};
