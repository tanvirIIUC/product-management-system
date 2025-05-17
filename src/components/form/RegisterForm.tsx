"use client"

import { registerUser } from "@/action/auth/RegisterUser";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const RegisterForm = () => {
    const router =  useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
    
        const form = e.currentTarget;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    
        const result = await registerUser({ name, email, password });
    
        if (result) {
            if (result?.status === 201) {
                toast.success(result?.message);
                router.push('/login');
            } else {
                toast.error(result?.message);
            }
            form.reset();
            setIsLoading(false);
        }
    };
    
    return <>
        {
            isLoading && <Loading />
        }

        <div className="px-10 py-10">
            <form className="mt-4 " onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4 relative">
                    <label className="block text-gray-600 text-sm font-semibold mb-1">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-9 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                    </button>
                </div>
                <button
                    type="submit"
                   className="w-full cursor-pointer bg-[#FF3811] text-white py-2 rounded-lg hover:bg-[#ff3911b3] transition"
                >
                    Register
                </button>
            </form>
            {/* <SocialLogin/> */}
            <p className="text-center text-sm text-gray-600 mt-4">
                Have an account? <Link href="/login" className="text-[#FF3811] hover:underline">Login</Link>
            </p>
        </div>

    </>

};
export default RegisterForm;