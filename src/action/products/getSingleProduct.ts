'use server';

import dbConnect from '@/lib/dbConnection';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { Product } from '@/models/Product';

export const getSingleProduct = async (productId: string) => {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return { error: 'Unauthorized' };
    }

    const data = await Product.findOne({ _id: new ObjectId(productId) });
    return { data: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return { error: 'Internal Server Error' };
  }
};
