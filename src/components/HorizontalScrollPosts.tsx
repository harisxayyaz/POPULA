// components/HorizontalScrollImages.tsx
import React, { useRef, useEffect } from "react";

const HorizontalScrollPosts: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    let scrollInterval: NodeJS.Timeout;

    const handleScrollReset = () => {
      if (scrollElement) {
        const scrollWidth =
          scrollElement.scrollWidth - scrollElement.clientWidth;
        const scrollLeft = scrollElement.scrollLeft;

        if (scrollLeft >= scrollWidth) {
          // Reset to first image smoothly
          scrollElement.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    };

    scrollInterval = setInterval(handleScrollReset, 100);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div ref={scrollRef} className="overflow-hidden whitespace-nowrap w-full">
      <div className="flex scroll-animation gap-6 p-10">
        <img
          src="/adv1.svg"
          alt="Ad 1"
          className="w-[30%] flex-shrink-0 transition-transform transform hover:scale-110 cursor-pointer"
        />
        <img
          src="/adv2.svg"
          alt="Ad 2"
          className="w-[30%] flex-shrink-0 transition-transform transform hover:scale-110 cursor-pointer"
        />
        <img
          src="/adv3.svg"
          alt="Ad 3"
          className="w-[30%] flex-shrink-0 transition-transform transform hover:scale-110 cursor-pointer"
        />
        <img
          src="/adv4.svg"
          alt="Ad 4"
          className="w-[30%] flex-shrink-0 transition-transform transform hover:scale-110 cursor-pointer"
        />
        <img
          src="/adv5.svg"
          alt="Ad 5"
          className="w-[30%] flex-shrink-0 transition-transform transform hover:scale-110 cursor-pointer"
        />
        <img
          src="/adv6.svg"
          alt="Ad 6"
          className="w-[30%] flex-shrink-0 transition-transform transform hover:scale-110 cursor-pointer"
        />
        <img
          src="/adcard1.svg"
          alt="Ad 1"
          className="w-[30%] flex-shrink-0 transition-transform transform hover:scale-110 cursor-pointer"
        />
        {/* Add other images */}
      </div>
    </div>
  );
};

export default HorizontalScrollPosts;
