"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data, status } = useSession();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false, // Keep redirect false to handle manually
      });

      if (response?.ok) {
        toast.success("Log in successful");
      } else {
        toast.error("Authentication failed");
        form.reset();
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect based on role
  useEffect(() => {
    if (status === "authenticated" && data?.user) {
      if (data.user.role === "admin") {
        router.push(`/dashboard/manageProducts/${data.user.id}`);
      } else {
        router.push("/products");
      }
    }
  }, [status, data, router]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="px-10 py-10">
        <form className="mt-4" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-600 text-sm font-semibold mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
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
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#FF3811] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
