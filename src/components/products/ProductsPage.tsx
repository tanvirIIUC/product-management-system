"use client";

import { getProducts } from "@/action/products/getProducts";
import { ProductItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const ProductsPage = () => {
  const [productsData, setProductsData] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (currentPage: number) => {
    setLoading(true);
    try {
      const res = await getProducts(currentPage, 6);
      if (res?.data) {
        setProductsData(res.data);
        setTotalPages(res.totalPages);
      } else {
        setProductsData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!productsData || productsData.length === 0) {
    return <div className="text-center text-gray-600">No products available</div>;
  }

  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {productsData.map((item) => (
          <div
            key={item._id}
            className="rounded-xl border border-[#E8E8E8] p-5 w-[364px] h-[348px]"
          >
            <Image
              className="rounded-xl"
              src={item.img}
              width={364}
              height={208}
              alt="logo"
            />
            <p className="text-[25px] font-bold my-3">{item.title}</p>
            <p className="text-[#FF3811] font-semibold text-xl flex justify-between items-center">
              {item.price}
              <Link href={`/products/${item._id}`}>
                <FaArrowRight />
              </Link>
            </p>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center text-lg font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
