import React from "react";

interface SidebarProps {
  selectedItem: number;
  setSelectedItem: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedItem, setSelectedItem }) => {
  const functions = [
    "Dashboard",
    "Post Manager",
    "Advertisement Manager",
    "Website Analysis",
    "Lead Manager",
    "Profile Management",
    "Business Profile",
    "Form Generator",
    "Templates",
    "Team",
    "Settings",
  ];

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
  };

  return (
    <div className="w-[350px] bg-white">
      <div className="flex justify-center p-8">
        <img src="./sidebarLogo.svg" alt="POPULA" />
      </div>
      <div className="flex flex-col items-center">
        <ul>
          {functions.map((item, index) => (
            <div
              key={index}
              className={`flex content-between w-full h-10 mt-2 mb-2 items-center cursor-pointer hover:bg-slate-100 hover:translate-y-[-4px] transition-transform`}
              onClick={() => handleItemClick(index)}
            >
              <img src="Vector.svg" alt="" className="w-[15px] h-[15px] mr-5" />
              <div
                className={`w-5 flex justify-end pr-2 font-semibold ${
                  index === selectedItem ? " text-[#2B3674]" : "text-[#A3AED0]"
                }`}
              >
                {index + 1}.
              </div>
              <li
                className={`font-semibold ${
                  index === selectedItem ? " text-[#2B3674]" : "text-[#A3AED0]"
                }`}
              >
                {item}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
