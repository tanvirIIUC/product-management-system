'use server';

import dbConnect from '@/lib/dbConnection';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { ObjectId } from 'mongodb';
import { Product } from '@/models/Product';

export const deleteProductById = async (id: string) => {
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

    const deleted = await Product.deleteOne({ _id: new ObjectId(id) });
    if (deleted.deletedCount === 0) {
      return { error: 'Failed to delete product' };
    }

    return { message: 'Product deleted successfully' };
  } catch (error) {
    console.error('Failed to delete product:', error);
    return { error: 'Internal Server Error' };
  }
};
