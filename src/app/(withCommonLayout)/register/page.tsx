import RegisterForm from "@/components/form/RegisterForm";
import Image from "next/image";

const RegisterPage = () => {
  return <div className="flex justify-center lg:mx-20 mb-10 mt-5 lg:mt-2 ">
    <div className="w-[80%] hidden lg:flex justify-center">
      <Image src='/assets/images/login/login.svg' width={300} height={100} alt="reg"/>
    </div>
    <div className="w-[90%] border border-[#A2A2A2] rounded-xl">
      <h1 className="text-center font-bold text-2xl pt-10">Register Form</h1>
    <RegisterForm/>
    </div>
  
  </div>;
};
export default RegisterPage;