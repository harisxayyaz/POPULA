


import React from "react";
import Card from "./Card";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Dashboard = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <div className="">
      <div className=" h-10 items-center flex flex-col justify-center bg-red-300 opacity-50 border-red-600 border-2 mb-4 rounded-md">
        <h1>Please Configure your business to avail all options</h1>
      </div>
      <div className="flex justify-between ">
        <div>
          <h1 className=" text-sm text-[#707EAE]">Pages / Dashboard</h1>
          <h1 className="text-3xl font-bold text-[#2B3674]">Main Dashboard</h1>
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
      <div className="mt-6 flex justify-between">
        <Card image="leadcard.svg" title="Total Leads" detail="1800" />
        <Card image="spendcard.svg" title="Spent this month" detail="$642.39" />
        <Card image="totalleadscard.svg" title="Total Leads" detail="2935" />

        <Card
          image="newassignmentscard.svg"
          title="New Assignments"
          detail="154"
        />
      </div>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col bg-white w-[49%] h-[250px] rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer">
          <div className="flex justify-between w-full p-5 ">
            <div className="flex bg-[#f4f7fe] rounded p-2 gap-1 w-1/4 justify-center items-center">
              <img src="calendar.svg" alt="" />
              <h1 className=" text-[#A3AED0] opacity-80 text-sm">This month</h1>
            </div>

            <img src="spendcard.svg" alt="" className="w-[40px] h-[40px]" />
          </div>
          <div className="flex ">
            <div className="w-[30%] flex flex-col items-center space-y-2">
              <div>
                <h1 className=" font-bold text-2xl text-[#2B3674]">$37.5k</h1>
                <h2 className="text-xs text-[#A3AED0]">Total Spent</h2>
              </div>

              <div className="flex gap-1">
                <img src="tick.svg" alt="" className="h-[15px] w-[15px]" />
                <h2 className=" text-[#05CD99] text-xs">On Track</h2>
              </div>
            </div>
            <div className="p-2flex justify-center w-full">
              <img src="graphvalues.svg" alt="" className="w-[100%] h-[95%]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white w-[49%] h-[250px] rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer">
          <div className="flex justify-between p-4">
            <h1 className="font-bold text-2xl text-[#2B3674]">
              Weekly Revenue
            </h1>
            <img src="leadcard.svg" alt="" className="w-[40px] h-[40px]" />
          </div>
          <div className=" w-full h-full">
            <img src="chart.svg" alt="" className="w-[100%] h-[90%]" />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-6 h-[260px]">
        <div className="flex flex-col bg-white w-[64%] rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer">
          <div className="flex justify-between p-4">
            <h1 className="font-bold text-2xl text-[#2B3674]">Lead Table</h1>
            <img
              src="totalleadscard.svg"
              alt=""
              className="w-[40px] h-[40px]"
            />
          </div>
          <div className="flex justify-between pr-5 pl-5 border-b-[1px]  border-[#E9EDF7] text-[#2B3674]">
            <h1 className="w-[18%] ">Name</h1>
            <h1>Status</h1>
            <h1>Last Heard</h1>

            <h1>Progress</h1>
          </div>

          <div className="pr-4 pl-4 flex flex-col gap-3 mt-2">
            <div className="flex justify-between">
              <h1 className=" font-bold text-[#2B3674] w-[20%]">
                L98-Abdullah
              </h1>
              <h1 className="pl-4">Approached</h1>
              <h1>18 Apr 2024</h1>
              <img src="Progress1.svg" alt="" />
            </div>
            <div className="flex justify-between">
              <h1 className=" font-bold text-[#2B3674] w-[20%]">
                L07-Fatima 
              </h1>
              <h1>Approached</h1>
              <h1>16 Jul 2024 </h1>
              <img src="Progress1.svg" alt="" />
            </div>
            <div className="flex justify-between">
              <h1 className=" font-bold text-[#2B3674] w-[20%]">
                L45-Ahsan Khan
              </h1>
              <h1 className="pl-7">Not Responding</h1>
              <h1>20 Feb 2024</h1>
              <img src="Progress1.svg" alt="" />
            </div>
            <div className="flex justify-between">
              <h1 className=" font-bold text-[#2B3674] w-[20%]">L84-Nabeela</h1>
              <h1 className="pl-4">Approached</h1>
              <h1>10 Jan 2024</h1>
              <img src="Progress1.svg" alt="" />
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white w-[32%] rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer">
          <div className="flex justify-between pt-4 pl-3 pr-3 items-center">
            <h1 className=" text-xl text-[#2B3674]  font-bold">
              Lead Conversion
            </h1>
            <div className="flex gap-1">
              <h1 className="text-sm text-[#2B3674]"> Monthly</h1>
              <img src="downarrow.svg" alt="" />
            </div>
          </div>
          <div className="justify-center flex pt-2 pb-1">
            <img src="piechart.svg" alt="" />
          </div>
          <div className="flex justify-between pr-5 pl-5 pb-4">
            <div className="flex flex-col justify-center items-center">
              <div className="flex gap-1">
                <img src="purpledot.svg" alt="" />
                <h1 className="text-[#A3AED0]">Instagram</h1>
              </div>
              <h1 className=" font-bold text-[#2B3674]">63%</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex gap-1">
                <img src="orangedot.svg" alt="" />
                <h1 className="text-[#A3AED0]">Facebook</h1>
              </div>
              <h1 className="font-bold text-[#2B3674]">63%</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
