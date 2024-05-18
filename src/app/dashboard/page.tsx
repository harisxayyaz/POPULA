"use client";

import React, { useState, useEffect } from "react";
import Drawer from "../components/Drawer";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import WebsiteAnalysis from "../components/WebsiteAnalysis";

const Dashboard: React.FC = () => {
  const [reportUrl, setReportUrl] = useState<string | null>(null);
   const [showWebsiteAnalysis, setShowWebsiteAnalysis] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

    const handleWebAnalysisClick = () => {
      setShowWebsiteAnalysis(true);
    };

  return (
    <div className="flex bg-white h-screen">
      <Drawer onWebAnalysisClick={handleWebAnalysisClick} />
      <div className="bg w-full h-full">
        <Navbar />
        <div className="p-16">
          {showWebsiteAnalysis && <WebsiteAnalysis />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
