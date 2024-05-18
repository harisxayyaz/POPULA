import React from "react";
import Button from "@mui/material/Button";

const forgotpassword = () => {
  return (
    <main
      className="flex flex-col w-screen h-screen justify-center items-center"
      style={{
        backgroundImage: "url('./background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-1/3 h-[30%] flex flex-col rounded-2xl bg-[#56007E] opacity-80 drop-shadow-2xl p-7  items-center justify-center">
        <h1 className="text-white text-2xl font-extrabold">Forgot Password</h1>
        <form className="flex flex-col space-y-4 mt-4 items-center">
          <label htmlFor="email">
            <input
              type="email"
              placeholder="Enter your email: "
              className="h-[35px] pl-4 rounded"
            />
          </label>
          <button
            type="submit"
            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#003465] hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  );
};

export default forgotpassword;
