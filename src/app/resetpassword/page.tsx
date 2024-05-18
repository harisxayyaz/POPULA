import React from "react";

const resetpassword = () => {
  return (
    <div className=" bg-custom-purple h-screen w-screen flex flex-col justify-center items-center">
      <div className=" w-[25%] h-[40%] bg-white rounded">
        <form className="p-6 space-y-4">
          <h1>Enter New Password</h1>
          <input
            type="password"
            placeholder="new password"
            className="w-full h-10 border-gray border-2 pl-4"
          />
          <h1>Confirm New Password</h1>
          <input
            type="password"
            placeholder="confirm new password"
            className="w-full h-10 border-gray border-2 pl-4"
          />
          <button
            type="submit"
            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-custom-purple hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default resetpassword;
