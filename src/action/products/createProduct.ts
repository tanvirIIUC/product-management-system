'use server';

import dbConnect from '@/lib/dbConnection';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { User } from '@/models/User';
import { z } from 'zod';
import '@/models/User';
import { Product } from '@/models/Product';
import { productSchema } from '@/lib/validations/product';

type ProductForm = z.infer<typeof productSchema>;
export const createProduct = async (formData: ProductForm) => {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return JSON.stringify({ error: 'Unauthorized' });
  }

  const parsed = productSchema.safeParse(formData);
  if (!parsed.success) {
    return JSON.stringify({ error: 'Validation failed' });
  }

  const currentUser = await User.findOne({ email: session.user.email });
  if (!currentUser) {
    return JSON.stringify({ error: 'User not found' });
  }

  const product = await Product.create({
    ...parsed.data,
    user: currentUser._id,
  });

  const populatedProduct = await product.populate({
    path: 'user',
    select: '-password -__v -updatedAt',
  });

  return JSON.stringify({ data: populatedProduct });
};

