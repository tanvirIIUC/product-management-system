'use server';

import dbConnect from '@/lib/dbConnection';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { productSchema } from '@/lib/validations/product';
import { Product } from '@/models/Product';
type ProductForm = z.infer<typeof productSchema>;

export const updateProductById = async (id: string, formData: ProductForm) => {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session.user.id) {
      return { error: 'Unauthorized' };
    }

    const product = await Product.findOne({ _id: new ObjectId(id) }).select('user _id');
    if (!product) {
      return { error: 'Product not found' };
    }

    if (product.user.toString() !== session.user.id) {
      return { error: 'Unauthorized' };
    }

    const parsed = productSchema.safeParse(formData);
    if (!parsed.success) {
      return { error: 'Validation failed' };
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true }
    ).select('title description img price');

    if (!updated) {
      return { error: 'Product not found after update' };
    }

    return { message: 'Product updated', data: updated };
  } catch (error) {
    console.error('Failed to update product:', error);
    return { error: 'Internal Server Error' };
  }
};
