
import Image from "next/image";
import React from "react";
import DropdownMenuComponent from "./DropdownMenu";

interface NavbarProps{
  title:string,
  description:string
}

const Navbar: React.FC<NavbarProps> = ({title, description}) => {
  return (
    <div className="flex justify-between ">
      <div>
        <h1 className=" text-sm text-[#707EAE]">Pages / {title}</h1>
        <h1 className="text-3xl font-bold text-[#2B3674]"> {description}</h1>
      </div>
      <div className="flex bg-white p-2 rounded-full h-13 gap-3 items-center">
        <input
          type="search"
          placeholder="search"
          className="rounded-full bg-[#f4f7fe] p-2 pl-6 4 placeholder-[#8F9BBA]"
        />
        <Image
          src="/notifications.svg"
          width={20}
          height={20}
          alt="Notifications"
        />
        <Image
          src="/moon.svg"
          width={20}
          height={20}
          alt="Notifications"
        />
        <Image
          src="/info.svg"
          width={20}
          height={20}
          alt="Notifications"
        />

        <DropdownMenuComponent />
      </div>
    </div>
  );
};

export default Navbar;
