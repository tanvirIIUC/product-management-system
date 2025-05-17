'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { productSchema } from '@/lib/validations/product';
import { createProduct } from '@/action/products/createProduct';


type ProductForm = z.infer<typeof productSchema>;

type Props = {
  setIsModalOpen: (isOpen: boolean) => void;
  refresh?: () => void;
};

export default function AddProductModal({ setIsModalOpen, refresh }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductForm) => {
    try {
      const result = await createProduct(data);

      if (typeof result === 'object' && result !== null && 'error' in result) {
        toast.error((result as { error: string }).error);
        return;
      }

      toast.success('Product added successfully');
      refresh?.();
      setIsModalOpen(false);
      reset();
    } catch (error) {
      console.error('Create product error:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center pb-5">Product form</h1>
        <input
          className="w-full p-2 border rounded"
          placeholder="Image URL"
          {...register('img')}
        />
        {errors.img && <p className="text-red-500 text-sm">{errors.img.message}</p>}

        <input
          className="w-full p-2 border rounded"
          placeholder="Title"
          {...register('title')}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        <input
          className="w-full p-2 border rounded"
          placeholder="Description"
          {...register('description')}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

        <input
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Price"
          {...register('price', { valueAsNumber: true })}
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
