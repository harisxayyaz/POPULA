// ImageWithText.tsx
"use client";
import React, { useState, useEffect } from "react";

interface ImageWithTextProps {
  imageSrc: string;
  date: string;
  title: string;
  buttonText: string;
}

const ImageWithText: React.FC = () => {
  // Array of images and their corresponding data
  const images = [
    {
      src: "/cards/blogimage1.svg",
      date: "24th January, 2024",
      title: "Latest Technical Insights",
      buttonText: "Read More >",
    },
    {
      src: "/cards/blogimage2.svg",
      date: "23rd January, 2024",
      title: "Mastering Social Media",
      buttonText: "Read More >",
    },
    {
      src: "/cards/blogimage3.svg",
      date: "22nd January, 2024",
      title: "The Future of Electric Cars",
      buttonText: "Read More >",
    },
    {
      src: "/cards/blogimage4.svg",
      date: "21st January, 2024",
      title: "Tesla’s Innovations",
      buttonText: "Read More >",
    },
  ];

  // State to track the current image
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change image every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const currentImage = images[currentImageIndex];

  return (
    <div className="relative w-full md:w-1/2 flex justify-center mb-8 md:mb-0 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
      {/* Container for the image and text overlay */}
      <div className="relative w-[90%] h-[90%]">
        {/* Image with gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent rounded"
          style={{ zIndex: 1 }}
        ></div>

        <img
          src={currentImage.src}
          alt="Image"
          className="w-full h-full object-cover rounded"
        />
        
        {/* Text Overlay */}
        <div className="absolute bottom-6 left-14 max-w-[60%] text-white" style={{ zIndex: 2 }}>
          <span className="block text-xl">{currentImage.date}</span>
          <h3 className="text-4xl font-semibold">{currentImage.title}</h3>
          <button className="text-blue-500 mt-2 hover:underline">
            {currentImage.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageWithText;
