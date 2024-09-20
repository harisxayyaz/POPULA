"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import WebsiteAnalysis from "@/components/WebsiteAnalysis";

const Websiteanalysis = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };
  return (
  //  <WebsiteAnalysis/>
  <div>web analysis</div>
  );
};

export default Websiteanalysis;
