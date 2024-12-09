import React from "react";

// Card Component accepting props for logo and title
const Card = ({ logoSrc, title }: { logoSrc: string; title: string }) => {
  return (
    <div className="bg-white shadow-lg rounded-[12px] border-2 border-[#35024D] p-6 text-center w-[453px] h-[303px] relative transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
      {/* Logo centered at the top */}
      <img
        src={logoSrc}
        alt={title}
        className="w-[100px] h-[100px] mx-auto mt-12"
      />
      {/* Title positioned 10% from the bottom */}
      <h3 className="text-[#35024D] text-[24px] font-bold font-urbanist absolute bottom-[15%] left-1/2 transform -translate-x-1/2">
        {title}
      </h3>
    </div>
  );
};

export default Card;
