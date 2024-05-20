import React from "react";

interface LandingCardProps {
  url: string;
  title: string;
  description: string;
}

const LandingCard: React.FC<LandingCardProps> = ({
  url,
  title,
  description,
}) => {
  return (
    <div className=" border-[1px] border-gray-400 h-[300px] w-[300px] rounded-lg border-opacity-50 flex flex-col justify-center items-center gap-6 cursor-pointer hover:translate-y-[-4px] transition-transform hover:scale-110 shadow-xl">
      <img src={url} alt="" className="w-[80px] h-[80px]" />
      <h1 className="text-2xl font-extrabold text-[#270139]">{title}</h1>
      <p className="text-[#8794BA] text-center">{description}</p>
    </div>
  );
};

export default LandingCard;
