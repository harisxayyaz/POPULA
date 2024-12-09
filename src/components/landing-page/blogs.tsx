// MyComponent.tsx
import React from "react";
import BlogCard from "./BlogCard"; // Make sure to import the BlogCard component
import ImageWithText from "./BlogImage"; // Import the updated ImageWithText component

const MyComponent = () => {
  return (
    <div className="flex flex-col items-center mt-[5%] justify-center">
      {/* Main Heading */}
      <h2>Read our Latest News and Blogs!</h2>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row w-[80%] mt-[2%] items-center justify-center">
        {/* Image Section with Changing Image */}
        <ImageWithText />

        {/* Cards Section */}
        <div className="md:w-1/2 w-full flex flex-col items-center md:items-start space-y-4">
          {/* BlogCard 1 */}
          <div className="w-full max-w-full flex justify-center">
            <BlogCard
              date="24th January, 2024"
              title="How to Create a Successful Social Media Campaign"
              image="/cards/blog1.svg" // Image relevant to social media campaign
            />
          </div>

          {/* BlogCard 2 */}
          <div className="w-full max-w-full flex justify-center">
            <BlogCard
              date="23rd January, 2024"
              title="Mastering Content Creation with AI"
              image="/cards/blog2.svg" // Image relevant to AI and content creation
            />
          </div>

          {/* BlogCard 3 */}
          <div className="w-full max-w-full flex justify-center">
            <BlogCard
              date="22nd January, 2024"
              title="Top 10 Tips for Engaging Social Media Content"
              image="/cards/blog3.svg" // Image relevant to social media content
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
