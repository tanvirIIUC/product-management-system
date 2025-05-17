'use server';

import dbConnect from '@/lib/dbConnection';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { Comment } from '@/models/Comment';
import { User } from '@/models/User';
import { ObjectId } from 'mongodb';
import { commentSchema } from '@/lib/validations/comment';
import { z } from 'zod';
import '@/models/Product'; 
import '@/models/User';   
type CommentForm = z.infer<typeof commentSchema>;

export const postComment = async (productId: string, formData: CommentForm) => {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { error: 'Unauthorized' };
    }

    const parsed = commentSchema.safeParse(formData);
    if (!parsed.success) {
      return { error: 'Validation failed' };
    }

    const currentUser = await User.findOne({ email: session.user.email });
    if (!currentUser) {
      return { error: 'User not found' };
    }

    const comment = await Comment.create({
      ...parsed.data,
      user: currentUser._id,
      product: new ObjectId(productId),
    });

    const populated = await comment.populate([
      { path: 'user', select: 'name email' },
      { path: 'product', select: 'title img' },
    ]);

    return { data: JSON.parse(JSON.stringify(populated)) };
  } catch (error) {
    console.error('Failed to post comment:', error);
    return { error: 'Internal Server Error' };
  }
};
