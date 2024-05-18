"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface DrawerProps {
  onWebAnalysisClick: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ onWebAnalysisClick }) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };
  return (
    <div className="w-1/5 h-[100vh] bg-custom-purple justify-between rounded-r-3xl">
      <div className="bg-custom-purple flex flex-col justify-between h-full pt-20 pb-10 rounded-r-3xl text-white">
        <div className="flex flex-col justify-center items-center">
          <ul className="flex flex-col gap-4 ">
            <li className="flex gap-3 cursor-pointer">
              <Image
                src="./Home.svg"
                height={0}
                width={0}
                alt="Home"
                className="h-5 w-5 "
              />
              Home
            </li>
            <li className="flex gap-3 cursor-pointer">
              <Image
                src="./Customers.svg"
                height={0}
                width={0}
                alt="Home"
                className="h-5 w-5 "
              />
              Leads
            </li>
            <li className="flex gap-3 cursor-pointer">
              <Image
                src="./Analytics.svg"
                height={0}
                width={0}
                alt="Home"
                className="h-5 w-5 "
              />
              Analytics
            </li>

            <li className="flex gap-3 cursor-pointer">
              <Image
                src="./Report.svg"
                height={0}
                width={0}
                alt="Home"
                className="h-5 w-5"
              />
              Reports
            </li>

            <li
              className="flex gap-3 cursor-pointer"
              onClick={onWebAnalysisClick}
            >
              <Image
                src="./analysis.svg"
                height={0}
                width={0}
                alt="Home"
                className="h-5 w-5"
              />
              Website Analysis
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center">
          <ul className="flex flex-col gap-4">
            <li className="flex gap-3 cursor-pointer">
              <Image
                src="./Settings.svg"
                height={0}
                width={0}
                alt="Home"
                className="h-5 w-5"
              />
              settings
            </li>
            <li className="flex gap-3 cursor-pointer" onClick={handleLogout}>
              <Image
                src="./Logout.svg"
                height={0}
                width={0}
                alt="Home"
                className="h-5 w-5"
              />
              logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
