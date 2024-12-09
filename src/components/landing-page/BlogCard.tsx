import React from "react";

interface CardProps {
  date: string;
  title: string;
  image: string; // URL for the image
}

const BlogCard: React.FC<CardProps> = ({ date, title, image }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 w-[95%] transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
      {/* Left Side: Text Content */}
      <div className="md:w-2/3 w-full flex flex-col justify-between">
        <span className="text-gray-500 text-sm">{date}</span>
        <h3 className="text-xl font-semibold mt-2">{title}</h3>

        {/* Align the button to the left */}
        <button className="text-blue-500 mt-4 hover:underline self-start">
          Read More &gt;
        </button>
      </div>

      {/* Right Side: Image */}
      <div className="md:w-1/3 w-full mt-4 md:mt-0">
        <img
          src={image}
          alt="Card Image"
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default BlogCard;
