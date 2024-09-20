"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const functions = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Post Manager", path: "/dashboard/postmanager" },
    { name: "Website Analysis", path: "/dashboard/websiteanalysis" },
    { name: "Lead Manager", path: "/dashboard/leadmanager" },
    { name: "Profile Management", path: "/dashboard/profilemanagement" },
    {
      name: "Business Configuration",
      path: "/dashboard/businessconfiguration",
    },
    { name: "Form Generator", path: "/dashboard/formgenerator" },
    { name: "Templates", path: "/dashboard/templates" },
    { name: "Team", path: "/dashboard/team" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  const handleClick = (path: string, index: number) => {
    setSelectedItem(index);
    router.push(path);
  };

  return (
    <div className="w-[ ] h-screen bg-white">
      <div className="flex justify-center p-8">
        <img src="/sidebarLogo.svg" alt="POPULA" />
      </div>
      <div className="flex flex-col items-center">
        <ul>
          {functions.map((item, index) => (
            <div
              key={index}
              className={`flex content-between w-full h-10 mt-2 mb-2 items-center cursor-pointer hover:bg-slate-100 hover:translate-y-[-4px] transition-transform`}
              onClick={() => handleClick(item.path, index)}
            >
              <img
                src="/Vector.svg"
                alt=""
                className="w-[15px] h-[15px] mr-5"
              />
              <li
                className={`${selectedItem === index ? "text-blue-600" : ""}`}
              >
                {item.name}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
