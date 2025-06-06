

import LoginForm from "@/components/form/LoginForm";
import Image from "next/image";


const LoginPage = () => {

    return (
        <div className="flex justify-center lg:mx-20 mb-10 mt-5 lg:mt-2 ">
        <div className="w-[80%] hidden lg:flex justify-center">
          <Image src='/assets/images/login/login.svg' width={300} height={100} alt="reg"/>
        </div>
        <div className="w-[90%] border border-[#A2A2A2] rounded-xl">
          <h1 className="text-center font-bold text-2xl pt-10">Login Form</h1>
        <LoginForm/>
        </div>
      
      </div>
    );
};

export default LoginPage;
