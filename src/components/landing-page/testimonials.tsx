// Testimonials.tsx
"use client";
import React from "react";

const Testimonials: React.FC = () => {
  return (
    <div className="relative w-full">
      {/* Full-width background image */}
      <img
        src="/testimonials.svg"
        alt="Testimonials Background"
        className="w-full object-cover"
      />

      {/* Centered column of images */}
      <div className="absolute inset-10 gap-8 flex mt-[15%] justify-center">
        {/* Image 1 */}
        <img
          src="/cards/test01.svg"
          alt="Testimonial 1"
          className="transition-transform duration-300 hover:scale-110"
        />

        {/* Image 2 */}
        <img
          src="/cards/test02.svg"
          alt="Testimonial 2"
          className="transition-transform duration-300 hover:scale-110"
        />

        {/* Image 3 */}
        <img
          src="/cards/test03.svg"
          alt="Testimonial 3"
          className="transition-transform duration-300 hover:scale-110"
        />
      </div>
    </div>
  );
};

export default Testimonials;
