"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Websiteanalysis = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };
  return (
    <div className="w-full p-6 max-h-screen overflow-y-scroll">
      <div className="flex justify ">
        <div>
          <h1 className=" text-sm text-[#707EAE]">Pages / Website Analysis</h1>
          <h1 className="text-3xl font-bold text-[#2B3674]">
            Website Analysis
          </h1>
        </div>
        <div className="flex bg-white p-2 rounded-full h-13 gap-3 items-center">
          <input
            type="search"
            placeholder="search"
            className="rounded-full bg-[#f4f7fe] p-2 pl-6 4 placeholder-[#8F9BBA]"
          />
          <img src="/notifications.svg" alt="" className=" w-5 h-5" />
          <img src="/moon.svg" alt="" className=" w-4 h-4" />
          <img src="/info.svg" alt="" className=" w-5 h-5" />
          <img
            src="/Profile.svg"
            alt=""
            className=" w-8 h-8 cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
nadsfjklasdjflkhadsjbfkmadsnfkjhaskdjdnf,masdbhfkj;asd;kfjhn

'adsfjjhejere hios  mmayujs mamkjust ofu bewtween ethis smmean  adhjehheme sitne lsi'
      <div className="bg-red-200 min-h-screen">
      <h1>Enter website's URL" </h1>
      </div>
    </div>
  );
};

export default Websiteanalysis;
