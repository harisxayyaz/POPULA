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
    {
      name: "Manage Businesses",
      path: "/admin/manage-business",
      icon: faNewspaper,
    },
    { name: "Analytics & Revenue", path: "/admin/revenue", icon: faUserTie },

    {
      name: "Social Media",
      path: "/admin/socialmedia",
      icon: faBuilding,
    },
    {
      name: "Manage Subscriptions",
      path: "/admin/manage-subscriptions",
      icon: faChartBar,
    },
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
                className={`text-[#5ea4ad] ${
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
