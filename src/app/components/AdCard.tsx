import React from "react";

interface CardProps {
  image: string;
  title: string;
}

const AdCard: React.FC<CardProps> = ({ image, title }) => {
  return (
    <div className="flex bg-white pl-4 items-center w-[248px] h-[100px] rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer justify-center">
      <div className="w-[30%] flex justify-center">
        <img src={image} alt="lead" />
      </div>
      <div className="pl-4">
        <h1 className="text-[#2B3674]">{title}</h1>
      </div>
    </div>
  );
};

export default AdCard;
