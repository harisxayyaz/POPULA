"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Signup: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        setError("");

        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <main
      className="flex flex-col w-screen h-screen justify-center items-center"
      style={{
        backgroundImage: "url('./background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-2/3 h-[70%] flex rounded-2xl bg-[#56007E] opacity-80 drop-shadow-2xl p-7">
        <div className="flex flex-col w-[40%] h-full  justify-center items-center">
          <div className="flex  flex-col gap-4  fixedSize">
            <img
              src="./logo.png"
              alt="logo"
              className="mx-auto w-[170px] h-[170px]"
            />
            <img
              src="./title.png"
              alt="title"
              className=" w-[250px] h-[45px]"
            />
          </div>
        </div>
        <div className="w-[65%] flex flex-col justify-center items-center mt-8 mb-8">
          <h1 className="text-white text-3xl font-extrabold mb-2">Signup</h1>
          <form className=" w-[70%]" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-3">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <p className="text-white">Email</p>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className=" mt-1 mb-1 appearance-none relative block w-full px-3 py-1.5 rounded border border-gray-300 placeholder-custom-purple text-gray-900 focus:outline-none focus:ring-custom-purple focus:border-custom-purple focus:z-10 sm:text-sm"
                  placeholder="username@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <p className="text-white">Password</p>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-1.5 border border-gray-300 placeholder-custom-purple text-gray-900 rounded focus:outline-none focus:ring-custom-purple focus:border-custom-purple focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <p className="text-white">Confirm Password</p>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-1.5 border border-gray-300 placeholder-custom-purple text-gray-900 rounded focus:outline-none focus:ring-custom-purple focus:border-custom-purple focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#003465] hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
              >
                Sign Up
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}

            {success && <p className="text-green-500">{success }</p>}
            <div className="text-sm justify-center flex flex-col items-center text-white gap-4 mt-4">
              <h3>Or continue with</h3>

              <div className="flex gap-4">
                <Button url={"./google.png"} />
                <Button url={"./facebook.png"} />
              </div>

              <Link
                href="/login"
                className="font-medium text-white hover:text-blue-900"
              >
                Already have an account? Sign in!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
