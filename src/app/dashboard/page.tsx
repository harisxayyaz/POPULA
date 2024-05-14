import React from "react";
import Drawer from "../components/Drawer";
import Image from "next/image";
import Navbar from "../components/Navbar";

const dashboard = () => {
  return (
    <div className="flex bg-white h-screen">
      <Drawer />
      <div className="bg w-full h-full">
       <Navbar/>

      </div>
    </div>
  );
};

export default dashboard;
