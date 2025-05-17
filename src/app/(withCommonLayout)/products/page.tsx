import ProductsPage from "@/components/products/ProductsPage";


const Products = async () => {

 
  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-[#FF3811] font-bold text-xl">Service</h1>
      <h1 className="font-bold text-4xl my-2">Our Service Area</h1>
      <p className="text-[#737373] text-[16px] mb-9 text-center lg:w-[600px]">
        the majority have suffered alteration in some form, by injected humour,
        or randomised words which don&apos;t look even slightly believable.
      </p>

      <ProductsPage/>

    </div>
  );
};

export default Products;
