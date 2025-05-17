'use server';

import dbConnect from '@/lib/dbConnection';
import { Comment } from '@/models/Comment';
import { ObjectId } from 'mongodb';
import '@/models/Product'; // ✅ Required for populate
import '@/models/User';    // ✅ Required for populate

export const getCommentsByProduct = async (productId: string) => {
  try {
    await dbConnect();

    const comments = await Comment.find({ product: new ObjectId(productId) }).populate([
      { path: 'user', select: 'name email' },
      { path: 'product', select: 'title img' },
    ]);

    return JSON.parse(JSON.stringify(comments)); // important to make serializable for client
  } catch (error) {
    console.error('Error loading comments:', error);
    return [];
  }
};
