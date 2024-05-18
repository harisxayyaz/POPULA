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
    </div>
  );
};

export default Dashboard;
