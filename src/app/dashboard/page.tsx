"use client";
import React, {useState, useEffect} from "react";
import Card from "@/components/Card";
import { useRouter } from "nextjs-toploader/app";
import Cookies from "js-cookie";
import { Barchart } from "@/components/Barchart";
import { Areachart } from "@/components/Areachart";
import { Piechart } from "@/components/Piechart";
import { useAppSelector } from "@/redux/store/hooks";
import Navbar from "@/components/Navbar";
import Link from "next/link";


interface Business {
  businessName: string;
  licenseNumber: string;
  domain: string;
  businessEmail: string;
  description?: string;
  website?: string;
  address?: string;
  facebookPageId?: string;
  instagramPageId?: string;
  totalLeads?: number;
  amountSpent?: number;
}

const Dashboard = () => {
    const [business, setBusiness] = useState<Business | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchBusiness = async () => {
        try {
          console.log("here");
          const token = localStorage.getItem("token");
          const response = await fetch(
            "http://localhost:5000/api/business/my-business",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Send the token in the Authorization header
              },
            }
          );
          if (response.ok) {
            const data = await response.json(); // Parse the JSON response
            setBusiness(data); // Set the image URL state
            console.log(data);
            setLoading(false);
          } else {
            console.error("Failed to fetch photo:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching photo:", error);
        }
      };
      fetchBusiness();
    }, []); 

  return (
    <div className="p-6 max-h-screen w-full overflow-y-scroll">  
        <Link
          className="px-20 h-10 items-center flex flex-col justify-center bg-red-300 opacity-50 border-red-600 border-2 mb-4 rounded-md"
          href="/dashboard/businessconfiguration"
        >
          Click to configure your business!
        </Link>
      <Navbar title="Dashboard" description={business?.businessName} />

      <div className="mt-6 flex justify-between">
        <Card image="leadcard.svg" title="Total Leads" detail={business?.totalLeads} />
        <Card image="spendcard.svg" title="Spent this month" detail={business?.amountSpent} />
        <Card image="totalleadscard.svg" title="Total Leads" detail={2935} />
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
            <div className="pb-10 w-full">
              <Areachart />
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white w-[49%] h-[250px] rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer">
          <div className="flex flex-col p-4">
            <h1 className="font-bold text-2xl text-[#2B3674]">
              Weekly Revenue
            </h1>
            <Barchart />
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
              <h1 className=" font-bold text-[#2B3674] w-[20%]">L07-Fatima</h1>
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
            <Piechart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
