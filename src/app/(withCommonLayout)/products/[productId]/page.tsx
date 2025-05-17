import ProductDetailsPage from "@/components/products/ProductDetailsPage";
import Image from "next/image";

const ProductDetails = async ({ params }: { params: Promise<{ productId: string }> }) => {
    const { productId } = await params;

    return <div className="mt-5">
        <section className="flex justify-center">
            <figure className="relative">
                <Image src='/assets/images/checkout/checkout.png' width={1137} height={300} alt="bgImage" />
                <div className="absolute product-details-banner rounded-xl w-full h-full top-0">
                    <div className="w-full h-full flex items-center">
                        <h1 className=" text-white lg:text-[45px] text-[25px] ps-24 font-bold">Service Details</h1>
                    </div>
                </div>
            </figure>

        </section>
        <ProductDetailsPage productId={productId} />

    </div>;
};
export default ProductDetails;