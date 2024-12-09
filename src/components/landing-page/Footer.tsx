// Footer.tsx
"use client";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full">
      {/* Full-width background image for the footer */}
      <img
        src="/footer.svg" // Replace with the image path you want to use
        alt="Footer Background"
        className="w-full object-cover"
      />

      {/* Overlay Links over the Image */}
      <div className="absolute inset-0 flex justify-center items-center gap-14 mb-16 text-white">
        <a
          href="#services"
          className="font-normal hover:font-bold hover:underline decoration-[#2A327D] transition-all duration-300 inline-block"
        >
          <span className="transform hover:scale-105 transition-all duration-300">
            Services
          </span>
        </a>
        <a
          href="#content"
          className="font-normal hover:font-bold hover:underline decoration-[#2A327D] transition-all duration-300 inline-block"
        >
          <span className="transform hover:scale-105 transition-all duration-300">
            Content
          </span>
        </a>
        <a
          href="#frame-insights"
          className="font-normal hover:font-bold hover:underline decoration-[#2A327D] transition-all duration-300 inline-block"
        >
          <span className="transform hover:scale-105 transition-all duration-300">
            Business Insights
          </span>
        </a>
        <a
          href="#website"
          className="font-normal hover:font-bold hover:underline decoration-[#2A327D] transition-all duration-300 inline-block"
        >
          <span className="transform hover:scale-105 transition-all duration-300">
            Website Analysis
          </span>
        </a>
        <a
          href="#form-area"
          className="font-normal hover:font-bold hover:underline decoration-[#2A327D] transition-all duration-3000 inline-block"
        >
          <span className="transform hover:scale-105 transition-all duration-3000">
            Forms
          </span>
        </a>
        <a
          href="#contact"
          className="font-normal hover:font-bold hover:underline decoration-[#2A327D] transition-all duration-3000 inline-block"
        >
          <span className="transform hover:scale-105 transition-all duration-300">
            Contact Us
          </span>
        </a>
        <a
          href="#blogs"
          className="font-normal hover:font-bold hover:underline decoration-[#2A327D] transition-all duration-300 inline-block"
        >
          <span className="transform hover:scale-105 transition-all duration-300">
            Blogs
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
