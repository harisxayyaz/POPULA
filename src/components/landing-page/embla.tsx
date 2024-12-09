"use client"; // EmblaCarousel.tsx
import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import Card from "./Card"; // Import the Card component

type PropType = {
  slides: { logoSrc: string; title: string }[]; // Updated slide structure to include logoSrc and title
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;

  const updatedOptions: EmblaOptionsType = {
    loop: true,
    ...options, // Retain any additional options passed from the parent component
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(updatedOptions);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  // State for managing hover state
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll behavior
  useEffect(() => {
    if (!emblaApi) return;

    const intervalDuration = 2000; // 3 seconds per scroll
    let scrollInterval: NodeJS.Timeout;

    // Start auto-scrolling when not hovered
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isHovered) {
          emblaApi.scrollNext(); // Scroll to the next slide
        }
      }, intervalDuration);
    };

    startAutoScroll(); // Initialize auto-scroll

    return () => {
      clearInterval(scrollInterval); // Clean up the interval when the component is unmounted
    };
  }, [emblaApi, isHovered]); // Dependency on emblaApi and isHovered to manage pausing

  return (
    <section
      className="embla"
      onMouseEnter={() => setIsHovered(true)} // Pause scrolling on hover
      onMouseLeave={() => setIsHovered(false)} // Resume scrolling when hover is removed
    >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide mt-10" key={index}>
              {/* Pass slide data to the Card component */}
              <Card logoSrc={slide.logoSrc} title={slide.title} />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
