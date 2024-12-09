import React from "react";

const Website = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-[100] space-y-6">
      {/* Heading */}
      <h2 className="font-bold text-center">Analyze Your Website</h2>

      {/* Subheading */}
      <h4 className="text-center max-w-[65%] leading-relaxed">
        Analyze your website’s performance with ease. Discover key insights and
        identify areas for improvement. Track important metrics to enhance your
        online presence and make informed decisions.
      </h4>

      {/* Image */}
      <div className="max-w-[80%] pt-[2%]">
        <img
          src="/website.svg" // Replace with your image URL
          alt="Website Analysis"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Website;
