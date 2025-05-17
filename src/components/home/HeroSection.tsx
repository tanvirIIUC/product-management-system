import Image from "next/image";

const HeroSection = () => {
  return <div>
    <div className="relative rounded"> 
            <Image className="rounded" width={1300} height={200} src="/assets/images/homeCarousel/1.jpg" alt="img"/>
        <div
        className="w-full h-full top-0 absolute product-details-banner rounded"
        >
            <div className="lg:p-[100px] p-5 lg:mt-[100px]">
                <h1 className="text-white lg:w-[400px] font-bold lg:text-[60px] text-2xl 
                ">Affordable Price For Car Servicing</h1>
                <p className="text-white lg:mt-10">There are many variations of passages of  available, but <br/> the majority have suffered alteration in some form</p>
                <button className="text-white bg-[#FF3811] py-2 px-4 rounded lg:mt-10">Discover More</button>
            </div>

        </div>
    </div>
  </div>;
};
export default HeroSection;