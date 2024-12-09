"use client";
import React, { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faNewspaper,
  faUserTie,
  faUser,
  faBuilding,
  faChartBar,
  faWrench,
  faUsers,
  faCog,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const functions = [
    { name: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
    { name: "Post Manager", path: "/dashboard/postmanager", icon: faNewspaper },
    { name: "Lead Manager", path: "/dashboard/leadmanager", icon: faUserTie },
    {
      name: "Profile Management",
      path: "/dashboard/profilemanagement",
      icon: faUser,
    },
    {
      name: "Business Profile",
      path: "/dashboard/businessprofile",
      icon: faBuilding,
    },
    {
      name: "Website Analysis",
      path: "/dashboard/websiteanalysis",
      icon: faChartBar,
    },
    {
      name: "Subscriptions",
      path: "/payment",
      icon: faClipboardList,
    },
    { name: "Templates", path: "/dashboard/template", icon: faWrench },
    { name: "Team", path: "/dashboard/team", icon: faUsers },
    { name: "Settings", path: "/dashboard/settings", icon: faCog },
  ];

  const handleClick = (path: string, index: number) => {
    setSelectedItem(index);
    router.push(path);
  };

  return (
    <div className="w-[370px] h-screen bg-white">
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
              <FontAwesomeIcon
                icon={item.icon}
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
