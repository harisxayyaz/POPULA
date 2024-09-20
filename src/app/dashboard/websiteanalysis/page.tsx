"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Websiteanalysis = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };
  return (
   <Websiteanalysis/>
  );
};

export default Websiteanalysis;
