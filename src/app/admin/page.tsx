"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import Card from "./_components/Card";
import Image from "next/image";
import BusinessUpdateCard from "./_components/BusinessUpdateCard";
import { Barchart } from "./_components/Barchart";
import { Calendar } from "@/components/ui/calendar";

type Props = {};

const page = (props: Props) => {
 
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="p-6 max-h-screen space-y-4 w-full overflow-y-scroll">
      <Navbar title="Dashboard" description={"Admin"} />
      <div className="mt-6 flex justify-between">
        <Card
          image="/admin/active.svg"
          title="Active Businesses"
          detail={"182"}
        />
        <Card
          image="/admin/revenue.svg"
          title="Total Revenue"
          detail={"978K"}
        />
        <Card
          image="/admin/verified.svg"
          title="Verified Businesses"
          detail={String(2935)}
        />
        <Card
          image="newassignmentscard.svg"
          title="Verification Pending"
          detail="154"
        />
      </div>

      <div className="bg-white p-6 space-y-4 rounded-2xl">
        <h1 className="text-[#0F8595] font-semibold text-[18px]">
          Business Updates
        </h1>
        <div className="flex justify-between">
          <BusinessUpdateCard
            title="B07-CricBuzz"
            status="Active"
            imagePath="/admin/cricbuzz.png"
            description="Dear Superadmin, Cricbuzz requests enhanced analytics for better tracking and managing our ...."
          />
          <BusinessUpdateCard
            title="B08-Bata"
            status="Paused"
            imagePath="/admin/bata.png"
            description="Bata Requested for Subcription Upgrade! Approve Now!"
          />
          <BusinessUpdateCard
            title="B07-Gree"
            status="Active"
            imagePath="/admin/gree.png"
            description="Requested business Verification! 
Verify Now!"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col bg-white w-full h-[250px] rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer">
          <div className="flex flex-col p-4">
            <h1 className="font-bold text-2xl text-[#2B3674]">
              Weekly Revenue
            </h1>
            <Barchart />
          </div>
        </div>

        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
