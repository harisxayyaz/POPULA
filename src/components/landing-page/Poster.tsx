import React from "react";
import Button from "./Button";

const Poster = () => {
  return (
    <div className="flex flex-col mx-[5%] md:flex-row items-center justify-evenly w-full px-12 py-0 md:space-x-1 mt-8">
      {/* Image Section */}
      <div className="md:w-[30%] w-full flex justify-end mt-6 md:mt-0">
        <img
          src="/Posters.svg" // Replace with your image URL
          alt="Social Area"
          className="w-full h-auto rounded"
        />
      </div>

      {/* Text Section */}
      <div className="md:w-[50%] w-full text-left space-y-4">
        <h2 className="font-bold">Easily Create Visuals</h2>
        <h4 className="">
          Elevate your posts with AI-generated visuals that are both engaging
          and professional. Our platform makes it easy to create eye-catching
          images for your content. Reach a wider audience with visuals designed
          to stand out. Simplify your social media strategy and make your posts
          more impactful. Harness the power of AI for superior visual content.
        </h4>
        <div className="flex justify-end mr-[20%] pt-5">
          <Button text="Learn More" />
        </div>
      </div>
    </div>
  );
};

export default Poster;
