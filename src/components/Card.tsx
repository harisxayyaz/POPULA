import React from "react";

interface CardProps {
  image: string;
  title: string;
  detail: string;
}

const Card: React.FC<CardProps> = ({ image, title, detail }) => {
  return (
    <div className="flex bg-white items-center w-[248px] h-[100px] rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer">
      <div className="w-[30%] flex justify-center">
        <img src={image} alt="lead" />
      </div>
      <div className="pl-4">
        <h1
          className={`${
            title === "Current Subscription" ? "text-sm" : "text-md"
          }  text-[#2B3674]`}
        >
          {title}
        </h1>
        <h1
          className={`${
            title === "Current Subscription" ? "text-sm" : "text-2xl"
          } font-semibold text-[#2B3674]`}
        >
          {detail}
        </h1>
      </div>
    </div>
  );
};

export default Card;
