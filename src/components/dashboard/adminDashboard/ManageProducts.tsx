'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

import { getProductsByAdmin } from '@/action/products/getProductsByAdmin';
import { deleteProductById } from '@/action/products/deleteProductById';
import AddProductModal from '@/components/ui/modal/AddProductModal';
import EditProductModal from '@/components/ui/modal/EditProductModal';

interface TProduct {
  _id: string;
  img: string;
  title: string;
  description: string;
  price: number;
}

const ManageProducts = ({ userId }: { userId: string }) => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const result = await getProductsByAdmin(userId, page, limit);
      if (result?.data) {
        setProducts(result.data);
        setTotalPages(result.totalPages || 1);
      } else {
        throw new Error(result?.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProducts();
    }
  }, [userId, page]);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const result = await deleteProductById(id);
      if (result?.error) throw new Error(result.error);
      toast.success(result.message || 'Product deleted successfully.');
      fetchProducts();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to delete product.');
      } else {
        toast.error('Failed to delete product.');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Product
        </button>
      </div>

      {isModalOpen && (
        <AddProductModal
          refresh={fetchProducts}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3 border-b">Image</th>
                  <th className="text-left p-3 border-b">Title</th>
                  <th className="text-left p-3 border-b">Description</th>
                  <th className="text-left p-3 border-b">Price</th>
                  <th className="text-left p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">
                        <Image
                          src={product.img}
                          alt={product.title}
                          width={100}
                          height={100}
                          className="w-10 h-10 object-cover rounded"
                        />
                      </td>
                      <td className="p-3 border-b">{product.title}</td>
                      <td className="p-3 border-b w-[100px]">
                        <div className="w-[100px] overflow-x-auto whitespace-nowrap">
                          {product.description}
                        </div>
                      </td>
                      <td className="p-3 border-b">{product.price} bdt</td>
                      <td className="p-3 border-b space-x-2">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setEditModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center p-4 text-gray-500">
                      No products available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center items-center gap-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {editModalOpen && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          setIsModalOpen={setEditModalOpen}
          refresh={fetchProducts}
        />
      )}
    </div>
  );
};

export default ManageProducts;
