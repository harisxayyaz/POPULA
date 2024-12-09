import React from "react";
import Button from "./Button";

const SocialArea = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full px-4 py-0">
      {/* Text Section */}
      <div className="md:w-1/2 w-full text-center md:text-left space-y-4">
        <h2>Connect to Multiple Social Platforms</h2>
        <h4>
          Easily share your content across all your social media accounts. Save
          time and reach more people with just one post!
        </h4>

        {/* Added spacing before the button */}
        <div className="pt-7">
          <Button text="Learn More" />
        </div>
      </div>

      {/* Image Section */}
      <div className="md:w-2/5 w-full flex justify-end mt-6 mr-[-150] md:mt-0">
        <img
          src="/socialfly.svg" // Replace with your image URL
          alt="Social Area"
          className="w-full h-auto rounded"
        />
      </div>
    </div>
  );
};

export default SocialArea;
