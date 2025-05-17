import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URL!;

if (!MONGODB_URI) throw new Error("Add NEXT_PUBLIC_MONGODB_URL to .env");

export default async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGODB_URI);
}