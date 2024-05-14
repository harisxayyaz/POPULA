import React from "react";
import Link from "next/link";
import Button from "@/components/Button";

interface User {
  id: number;
  name: string;
}

const signup = async () => {
  return (
    <main
      className="flex-col h-screen relative "
      style={{
        backgroundImage: "url('./background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative flex justify-between h-screen">
        <div
          style={{
            backgroundImage: "url('./left1.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className=" h-[650px] w-[800px] absolute bottom-0 flex flex-col justify-center items-center "
        >
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <p className="text-white">Email</p>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className=" mt-1 mb-1 appearance-none  relative block w-full px-3 py-2 rounded border border-gray-300 placeholder-custom-purple text-gray-900  focus:outline-none focus:ring-custom-purple focus:border-custom-purple focus:z-10 sm:text-sm"
                  placeholder="username@gmail.com"
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
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-custom-purple text-gray-900 rounded focus:outline-none focus:ring-custom-purple focus:border-custom-purple focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-white hover:text-blue-900"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-custom-purple hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
            <div className="text-sm justify-center flex flex-col items-center text-white gap-5">
              <Link
                href="/signup"
                className="font-medium text-white hover:text-blue-900"
              >
                Don't have an account? Sign up!
              </Link>

              <h3>Or continue with</h3>

              <div className="flex gap-4">
                <Button url={"./google.png"} />
                <Button url={"./facebook.png"} />
              </div>
            </div>
          </form>
        </div>
        <div
          style={{
            backgroundImage: "url('./right1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-1/3 h-5/6 absolute right-0 flex flex-col justify-center items-center"
        >
          <img src="./logo.png" alt="logo" className="w-52" />
          <img src="./title.png" alt="title" className="mt-4 mb-16 w-52" />
        </div>
      </div>
    </main>
  );
};

export default signup;
