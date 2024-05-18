import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex gap-5 h-20 items-center place-content-end pr-10 shadow-lg">
      <Image
        src="Ping.svg"
        alt="notification"
        height={0}
        width={0}
        className="h-10 w-10 cursor-pointer"
      />
      <Image
        src="Profile.svg"
        alt="profile"
        height={0}
        width={0}
        className="h-10 w-10 cursor-pointer"
      />
      <div className="flex flex-col justify-center items-center">
        <h2>Zuwanish Mohammad</h2>
        <h3 className=" text-gray-600 text-sm">zuwanish@gmail.com</h3>
      </div>
    </div>
  );
};

export default Navbar;
