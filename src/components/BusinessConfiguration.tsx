import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const BusinessConfiguration = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };
  return (
    <div className="bg-red-200 h-full">
      <div className="flex justify-between ">
        <div>
          <h1 className=" text-sm text-[#707EAE]">
            Pages / Business Configuration
          </h1>
          <h1 className="text-3xl font-bold text-[#2B3674]">
            Business Configuration
          </h1>
        </div>
        <div className="flex bg-white p-2 rounded-full h-13 gap-3 items-center">
          <input
            type="search"
            placeholder="search"
            className="rounded-full bg-[#f4f7fe] p-2 pl-6 4 placeholder-[#8F9BBA]"
          />
          <img src="notifications.svg" alt="" className=" w-5 h-5" />
          <img src="moon.svg" alt="" className=" w-4 h-4" />
          <img src="info.svg" alt="" className=" w-5 h-5" />
          <img
            src="Profile.svg"
            alt=""
            className=" w-8 h-8 cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>

      <div className="bg-blue-200 p-4 border-y-1 border-black">
        <ul className="flex justify-between">
          <li>1- Basic Information</li>
          <li>2- Administrative Details</li>
          <li>3- Bank Info</li>
          <li>4- Social Media Configuration</li>
        </ul>
      </div>
    </div>
  );
};

export default BusinessConfiguration;
