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

const AdminSidebar: React.FC = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const functions = [
    { name: "Dashboard", path: "/admin", icon: faTachometerAlt },
    { name: "Post Manager", path: "/admin/postmanager", icon: faNewspaper },
    { name: "Lead Manager", path: "/admin/leadmanager", icon: faUserTie },
    {
      name: "Business Manager",
      path: "/admin/profilemanagement",
      icon: faUser,
    },
    {
      name: "Analytics",
      path: "/admin/businessprofile",
      icon: faBuilding,
    },
    {
      name: "Manage Admins",
      path: "/admin/websiteanalysis",
      icon: faChartBar,
    },
    {
      name: "Revenue",
      path: "/admin/formgenerator",
      icon: faClipboardList,
    },
    { name: "Social Media", path: "/admin/socialmedia", icon: faWrench },
    { name: "Manage Subscriptions", path: "/admin/team", icon: faUsers },
    { name: "Blogs", path: "/admin/settings", icon: faCog },
    { name: "Settings", path: "/admin/settings", icon: faCog },
  ];

  const handleClick = (path: string, index: number) => {
    setSelectedItem(index);
    router.push(path);
  };

  return (
    <div className="w-[370px] h-screen bg-white">
      <div className="flex justify-center p-8">
        <img src="/logo-teal.svg" alt="POPULA" />
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
                className="w-[15px] h-[15px] mr-5 text-[#0F8595]"
              />
              <li
                className={`text-[#A5D1D7] ${
                  selectedItem === index ? "text-[#063E45]" : ""
                }`}
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

export default AdminSidebar;
