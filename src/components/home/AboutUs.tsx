import Image from "next/image";

const AboutUs = () => {
  return <div className="my-20">
    <div className="lg:flex">
        <figure className=" w-full relative">
            <Image className="rounded-xl" width={460} height={450} src="/assets/images/about_us/person.jpg" alt="im"/>
            <div className="absolute top-[150px] left-[200px] border-8 border-white rounded-xl">
                <Image width={330} height={300} src="/assets/images/about_us/parts.jpg" alt="aa"/>
            </div>
        </figure>
        <section className="w-full mt-5 p-3">
          <p className="text-[#FF3811] font-semibold">About Us</p>
          <h1 className="font-bold text-4xl w-[300px] my-5">We are qualified & of experience in this field</h1>
        <p className="text-[#737373]">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable. </p>
        <button className="text-white bg-[#FF3811] mt-5 py-2 px-4 rounded lg:mt-10">More Info</button>
        </section>
    </div>
  </div>;
};
export default AboutUs;