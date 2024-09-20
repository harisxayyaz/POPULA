import React from "react";

interface LandingButtonProps {
  text: string;
  color: string;
  font: string;
}

const LandingButton: React.FC<LandingButtonProps> = ({ text, color, font }) => {
  const backgroundColor = color === "white" ? "bg-white" : "bg-[#270139]";
  const textColor = font === "black" ? "text-black" : "text-white";

  return (
    <div
      className={`${backgroundColor} ${textColor} rounded-full h-[35px] flex items-center w-[120px] justify-center font-bold`}
    >
      {text}
    </div>
  );
};

export default LandingButton;
