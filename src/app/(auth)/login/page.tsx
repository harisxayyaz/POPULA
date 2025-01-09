"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Unna } from "next/font/google";
import { useAppSelector } from "@/redux/store/hooks";
import { useAppDispatch } from "@/redux/store/hooks";
import { setToken } from "@/redux/features/business/businessSlice";
import Sidebar from "../_components/Sidebar";

const unna = Unna({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search); // Avoid useSearchParams directly
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(setToken(data.token));
        localStorage.setItem("token", data.token);
        setError("");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <main className="flex flex-col md:flex-row w-screen h-screen">
      <section className="md:w-full md:h-full p-6 flex flex-col">
        <div className="flex flex-col justify-center md:h-full h-[80vh]">
          <div className="flex justify-center mb-6">
            <form className="space-y-6 w-full max-w-md" onSubmit={handleSubmit}>
              <img src="logo.svg" alt="logo" className="h-12 block md:hidden" />
              <div className={`${unna.className} `}>
                <h1 className="text-4xl font-bold">Welcome Back!</h1>
              </div>
              <div className="relative">
                <input
                  type="email"
                  required
                  className="w-full h-10 text-md px-2 text-black bg-transparent border border-purple rounded-md outline-none peer"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="absolute top-1/2 left-1 text-sm text-black px-2 pointer-events-none transform -translate-y-1/2 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:bg-white peer-valid:top-0 peer-valid:text-sm peer-valid:bg-white">
                  Email
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  className="w-full h-10 text-md px-2 text-black bg-transparent border border-purple rounded-md outline-none peer"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="absolute top-1/2 left-1 text-sm text-black px-2 pointer-events-none transform -translate-y-1/2 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:bg-white peer-valid:top-0 peer-valid:text-sm peer-valid:bg-white">
                  Password
                </label>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="relative">
                <button
                  className="w-full h-10 bg-red-500 text-white rounded-md hover:bg-red-700"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
              <div className="flex justify-between">
                <p className="text-blue-500 cursor-pointer md:text-sm hover:text-blue-800 ">
                  <Link href="/signup">Don't have an account? Sign up</Link>
                </p>
                <p className="text-blue-500 cursor-pointer md:text-sm hover:text-blue-800 ">
                  <Link href="/forgotpassword">Forgot Password?</Link>
                </p>
              </div>
            </form>
          </div>
          <div
            onClick={() => {
              window.location.href = "http://localhost:5000/auth/google";
            }}
            className="flex items-center justify-center cursor-pointer"
          >
            <h1 className="text-center text-sm mr-1">or sign in using</h1>
            <img src="google.svg" alt="google" className="h-5 w-5" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
