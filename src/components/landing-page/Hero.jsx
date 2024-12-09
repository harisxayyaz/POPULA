import React from "react";
import Button from "./Button";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-[#E4E4E4] to-[#A7A9D7] h-[970px] flex flex-col items-center text-center">
      {/* Main text */}
      <h1 className="text-[68px] font-black font-hind mt-[120] max-w-4xl leading-[1.1] text-[#35024D]">
        The All-in-one tool for your Business Optimization
      </h1>

      {/* Tagline */}
      <p className="text-[23px] font-light font-inter mt-[45] mb-11 px-4 max-w-6xl ">
        Popula helps you create dynamic forms, manage posts, capture leads, and
        analyze performance with AI, simplifying your business processes so you
        can focus on growth.
      </p>

      {/* Button */}
      <Button text="Try it free" />

      {/* Image */}
      <img
        src="/heroimages.svg"
        alt="Hero"
        className="mt-9 w-4/5 ml-[100] object-cover"
      />
    </div>
  );
};

export default Hero;
