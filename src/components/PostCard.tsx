import React from "react";

interface CardProps {
  image: string;
  title: string;
  onClick: () => void; // Add onClick prop
}

const PostCard: React.FC<CardProps> = ({ image, title, onClick }) => {
  return (
    <div
      className="flex bg-white items-center gap-2 w-[248px] h-[100px] rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer justify-center"
      onClick={onClick}
    >
      <div className="w-[30%] flex justify-center">
        <img src={image} alt="lead" />
      </div>
      <div className="pl-2">
        <h1 className="text-[#2B3674]">{title}</h1>
      </div>
    </div>
  );
};

export default PostCard;
