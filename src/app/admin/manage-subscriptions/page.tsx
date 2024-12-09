"use client";
import DynamicCard from "./_components/DynamicCard";
import Navbar from "@/components/Navbar";
import { usePaymentPlans } from "@/hooks/usePaymentPlans";
import Image from "next/image";
import React from "react";

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="h-56 w-[70%] bg-gray-200 animate-pulse rounded-lg overflow-hidden">
    <div className="h-full bg-gray-300"></div>
    <div className="bg-white w-full p-4 gap-4 flex flex-col">
      <div className="h-4 bg-gray-300 w-3/4 mb-2 rounded"></div>
      <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
      <div className="space-y-2 mt-4">
        <div className="h-3 bg-gray-300 w-full rounded"></div>
        <div className="h-3 bg-gray-300 w-full rounded"></div>
        <div className="h-3 bg-gray-300 w-full rounded"></div>
      </div>
    </div>
  </div>
);

type Props = {};

const ManageSubscriptions = (props: Props) => {
  const { plans, loading } = usePaymentPlans();

  return (
    <div className="max-h-screen w-full overflow-y-scroll p-4">
      <Navbar title="Admin" description="Manage Subscriptions" />
      <div className="flex flex-col justify-center items-center mt-8 gap-4">
        <div className="bg-cover">
          <Image
            src="/payment/subscription.png"
            width={982}
            height={178}
            alt="Banner"
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full gap-4 p-4 ">
            {loading ? (
              // Show skeleton loaders when data is loading
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              // Show actual cards once data is loaded
              plans.map((plan) => (
                <DynamicCard
                  id={plan.id}
                  key={plan.id}
                  description={plan.description}
                  imagePath={plan.imagePath}
                  listItems={plan.listItems}
                  onClick={() => console.log(`Selected Plan: ${plan.id}`)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSubscriptions;
