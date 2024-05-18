"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import WebsiteAnalysis from "../components/WebsiteAnalysis";
import Sidebar from "../components/Sidebar";
import DashboardComponent from "../components/DashboardComponent";

const Dashboard: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const renderContent = () => {
    switch (selectedItem) {
      case 0:
        return <DashboardComponent />;
      case 8:
        return <WebsiteAnalysis />;
      // Add cases for other components as needed
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="flex bg-[#f4f7fe] h-screen w-screen">
      <Sidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <div className="w-full pt-8 pb-8 pl-16 pr-16 ">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
