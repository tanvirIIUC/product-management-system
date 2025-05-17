// app/action/products/getProductsByAdmin.ts
'use server';

import dbConnect from '@/lib/dbConnection';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { ObjectId } from 'mongodb';
import { Product } from '@/models/Product';

export const getProductsByAdmin = async (
  userId: string,
  page: number = 1,
  limit: number = 10
) => {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { error: 'Unauthorized' };
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Product.find({ user: new ObjectId(userId) })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-updatedAt -__v'),
      Product.countDocuments({ user: new ObjectId(userId) }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: JSON.parse(JSON.stringify(data)),
      totalPages,
    };
  } catch (error) {
    console.error('Failed to fetch paginated products by user:', error);
    return { error: 'Internal Server Error' };
  }
};
