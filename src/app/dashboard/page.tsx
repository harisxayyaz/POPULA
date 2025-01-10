"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import { Barchart } from "@/components/Barchart";
import { Areachart } from "@/components/Areachart";
import { Piechart } from "@/components/Piechart";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { setBusinessId } from "@/redux/features/business/businessSlice";
import { Lead as ColumnLead, columns } from "./leadmanager/columns";
import { DataTable } from "./leadmanager/data-table2";

interface Business {
  _id: string;
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
  status?: string;
  subscription?: string;
}

interface LeadData {
  name: string;
  _id: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  country: string;
  status: string;
}

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leads, setLeads] = useState<ColumnLead[]>([]);

  const fetchBusiness = async () => {
    try {
      console.log("here");
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://popula-backend-efc1.onrender.com/api/business/my-business",
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
        console.log("this is being printed", data);
        dispatch(setBusinessId(data._id));
        setLoading(false);
      } else {
        console.error("Failed to fetch photo:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching photo:", error);
    }
  };

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://popula-backend-efc1.onrender.com/api/lead",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }

      const data = await response.json();

      return data.map((lead: LeadData) => ({
        id: lead._id,
        leadname: lead.name || "N/A",
        company: "Unknown", // Default value if company data isn't available
        status: lead.status || "pending",
        email: lead.email,
        country: lead.country || "Unknown",
        phone: lead.phoneNumber,
      }));
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchBusiness();
  }, []);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const data = await fetchLeads();
        setLeads(data);
        console.log("leads", data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, []);

  return (
    <div className="p-6 max-h-screen w-full overflow-y-scroll">
      {business?.status?.toLowerCase() === "hold" && (
        <Link
          className="px-20 h-10 items-center flex flex-col justify-center bg-red-300 opacity-50 border-red-600 border-2 mb-4 rounded-md"
          href="/dashboard/businessconfiguration"
        >
          Click to configure your business!
        </Link>
      )}

      <Navbar title="Dashboard" description={business?.businessName || ""} />
      <div className="mt-6 flex justify-between">
        <Card
          image="leadcard.svg"
          title="Total Leads"
          detail={String(leads?.length || 0)}
        />
        <Card
          image="spendcard.svg"
          title="Spent this month"
          detail={String(business?.amountSpent || 0)}
        />
        <Card
          image="totalleadscard.svg"
          title="Total Leads"
          detail={String(business?.totalLeads || 0)}
        />
        <Card
          image="newassignmentscard.svg"
          title="Current Subscription"
          detail={String(business?.subscription || "Free")}
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
                <h1 className=" font-bold text-2xl text-[#2B3674]">
                  ${String(business?.amountSpent || 0)}
                </h1>
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
      <div className="flex w-full justify-between mt-6 ">
        <div className="flex flex-col bg-white  rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer p-4">
          {columns && leads ? (
            <DataTable columns={columns} data={leads} />
          ) : (
            "No Leads Yet"
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
