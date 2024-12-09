import React from "react";

const Content = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly w-full px-12 py-0 md:space-x-1 mt-8">
      {/* Image Section */}
      <div className="md:w-1/3 w-full flex justify-end mt-6 md:mt-0">
        <img
          src="/editcontent.svg" // Replace with your image URL
          alt="Social Area"
          className="w-full h-auto rounded"
        />
      </div>

      {/* Text Section */}
      <div className="md:w-2/5 w-full text-center md:text-left space-y-4">
        <h2>Generate Content & Hashtags</h2>
        <h4>
          Create standout posts easily with POPULA. Get catchy titles and trending hashtags for your content. Share on multiple social media platforms with minimal effort. Reach more people and make a bigger impact. Let POPULA help you make every post count.
        </h4>
      </div>
    </div>
  );
};

export default Content;
