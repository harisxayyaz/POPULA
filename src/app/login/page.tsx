'use client'
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main
      className="flex-col h-screen relative "
      style={{
        backgroundImage: "url('./background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex-col h-screen w-screen z-0 absolute">
        <img
          src="./left.png"
          alt="left"
          className=" h-screen left-0 absolute"
        />
        <img
          src="./right.png"
          alt="right"
          className="h-screen absolute right-0 top-0 "
        />
      </div>

      <div className="flex flex-row absolute z-1 h-screen items-center">
        <div className="flex-row w-52 ml-20">
          <img src="./logo.png" alt="logo" />
          <img src="./title.png" alt="title" />
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 z-1 absolute right-20  w-1/4">
        <div className="max-w-md w-full space-y-8 ">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-white">Login</h2>
          </div>
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
                onClick={() => {
                  router.push("./dashboard");
                }}
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
      </div>
    </main>
  );
}
