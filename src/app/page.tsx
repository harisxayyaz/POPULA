import Image from "next/image";
import Link from "next/link";


export default function Home() {
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
          className="h-screen absolute right-0 top-0"
        />
      </div>

      <div className="flex flex-row absolute z-1 h-screen items-center">
        <div className="flex-row w-80 ml-12">
          <img src="./logo.png" alt="logo" />
          <img src="./title.png" alt="title" />
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 z-1 absolute right-20  w-1/4">
        <div className="max-w-md w-full space-y-8 ">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Login
            </h2>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className=" mt-1 mb-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-white hover:text-blue-900"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
            <div className="text-sm justify-center flex">
              <a
                href="#"
                className="font-medium text-white hover:text-blue-900"
              >
                Don't have an account? Sign up!
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
