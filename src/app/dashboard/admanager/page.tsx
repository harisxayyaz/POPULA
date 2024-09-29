"use client";
import React from "react";
import Card from "@/components/Card";
import HorizontalScrollImages from "@/components/HorizontalScrollImages";
import AdCard from "@/components/AdCard";

const AdManager = () => {
  return (
    <div className="max-h-screen w-full overflow-y-scroll  p-4">
      <div className="flex justify-between ">
        <div>
          <h1 className=" text-sm text-[#707EAE]">Pages / Social Sphere</h1>
          <h1 className="text-3xl font-bold text-[#2B3674]">
            Advertisement Manager
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
      <div className="mt-6 flex justify-between">
        <Card image="/leadcard.svg" title="Total Views" detail="978" />
        <Card image="/ad1.svg" title="Total Clicks" detail="1435" />
        <Card image="/newassignmentscard.svg" title="Running Ads" detail="12" />

        <Card image="/usa.svg" title="Current Balance" detail="$804" />
      </div>

      <div className="h-[50%] flex items-center ">
        <HorizontalScrollImages />
      </div>

      <div className=" h-[350px] flex justify-between">
        <div className=" h-[95%] pl-4 flex flex-col bg-white w-[74%] rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer ">
          <div className="flex justify-between p-4">
            <h1 className="font-bold text-2xl text-[#2B3674]">
              Running Advertisments
            </h1>
            <img
              src="/totalleadscard.svg"
              alt=""
              className="w-[40px] h-[40px]"
            />
          </div>
          <div className="flex justify-between pr-5 pl-5 border-b-[1px]  border-[#E9EDF7] text-[#2B3674]">
            <h1 className="w-[18%] ">Adv</h1>
            <h1>Date Posted</h1>
            <h1>Expiry Date</h1>

            <h1>Time Remaining</h1>
          </div>

          <div className="pr-4 pl-4 flex flex-col gap-3 mt-2">
            <div className="flex justify-between">
              <h1 className=" font-bold text-[#2B3674] w-[20%]">
                PO1-Product 1
              </h1>
              <h1 className="pl-5">11 Apr 2024</h1>
              <h1>18 Apr 2024</h1>
              <img src="/adprogress1.svg" alt="" />
            </div>
            <div className="flex justify-between">
              <h1 className=" font-bold text-[#2B3674] w-[20%]">
                PO2-Product 2
              </h1>
              <h1 className="pl-4">09 Jul 2024</h1>
              <h1>16 Jul 2024 </h1>
              <img src="/adprogress2.svg" alt="" />
            </div>
            <div className="flex justify-between">
              <h1 className=" font-bold text-[#2B3674] w-[20%]">
                PO3-Product 3
              </h1>
              <h1 className="pl-5">13 Feb 2024</h1>
              <h1>20 Feb 2024</h1>
              <img src="/adprogress3.svg" alt="" />
            </div>
            <div className="flex justify-between">
              <h1 className=" font-bold text-[#2B3674] w-[20%]">
                PO4-Product 4
              </h1>
              <h1 className="pl-4">03 Jan 2024</h1>
              <h1>10 Jan 2024</h1>
              <img src="/adprogress4.svg" alt="" />
            </div>

            <div className="flex justify-between">
              <h1 className=" font-bold text-[#2B3674] w-[20%]">
                PO4-Product 5
              </h1>
              <h1 className="pl-4">03 Jan 2024</h1>
              <h1>10 Jan 2024</h1>
              <img src="/adprogress3.svg" alt="" />
            </div>

            <div className="flex justify-between">
              <h1 className=" font-bold text-[#2B3674] w-[20%]">
                PO4-Product 6
              </h1>
              <h1 className="pl-4">03 Jan 2024</h1>
              <h1>10 Jan 2024</h1>
              <img src="/adprogress4.svg" alt="" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 font-bold">
          <AdCard image="/plusicon.svg" title="Create New Advertisement" />
          <AdCard image="/plus.svg" title="View All Advertisments" />
          <AdCard
            image="/viewinactive.svg"
            title="View Inactive Advertisements"
          />
        </div>
      </div>
    </div>
  );
};

export default AdManager;
