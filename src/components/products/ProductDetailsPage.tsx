"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import CommentForm from "../form/CommentForm";
import { ProductItem } from "@/types";
import { getSingleProduct } from "@/action/products/getSingleProduct";

const ProductDetailsPage = ({ productId }: { productId: string }) => {
    const [data, setData] = useState<ProductItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {

            setLoading(true);
            const res = await getSingleProduct(productId);
            if (res?.data) {
                setData(res.data);
            } else {
                console.error(res.error || 'Unknown error');
            }
            setLoading(false);
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);
    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }
    if (!data) return <div>Product not found</div>;
    return (
        <div>
            <section className="flex lg:gap-10 gap-3 my-10 p-2">
                <div className="w-[70%] flex justify-center rounded-xl">
                    {data?.img && (
                        <Image className="rounded-xl" src={data?.img} width={560} height={300} alt="productImg" />
                    )}

                </div>
                <div className="w-[30%] flex flex-col items-center">
                    <p className="lg:text-4xl font-semibold mb-4"> Price : ${data?.price}</p>
                   

                </div>

            </section>
            <div className="">
                <p className="p-5">
                    {data?.description}
                </p>
            </div>
            <div>{
                data?._id && (
                    <CommentForm productId={data?._id} />
                )
            }

            </div>
        </div>
    );
}
export default ProductDetailsPage;