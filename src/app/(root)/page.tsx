// Page.tsx
"use client";
import { useEffect } from "react";
import React from "react";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Nav";
import Services from "@/components/landing-page/Services";
import Satisfaction from "@/components/landing-page/satisfaction";
import SocialArea from "@/components/landing-page/socialarea";
import Content from "@/components/landing-page/content";
import FrameInsights from "@/components/landing-page/frameinsights";
import Website from "@/components/landing-page/website";
import Poster from "@/components/landing-page/Poster";
import FormArea from "@/components/landing-page/FormArea";
import Blogs from "@/components/landing-page/blogs";
import SectionWithContactForm from "@/components/landing-page/Message";
import Testimonials from "@/components/landing-page/testimonials";
import Footer from "@/components/landing-page/Footer";

// Function to perform slow scrolling to a target element
const slowScrollTo = (target: HTMLElement, duration: number) => {
  const start = window.scrollY;
  const end = target.offsetTop;
  const distance = end - start;
  let startTime: number | null = null;

  // Function for smooth animation using requestAnimationFrame
  const animateScroll = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const timeElapsed = timestamp - startTime;
    const progress = Math.min(timeElapsed / duration, 1); // Ensure progress doesn't exceed 1
    window.scrollTo(0, start + distance * progress); // Scroll the page
    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll); // Continue the animation
    }
  };

  // Start the scroll animation
  requestAnimationFrame(animateScroll);
};

const Page = () => {
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        // Get the target section ID from the clicked link
        const targetId = link.getAttribute("href")?.slice(1); // Remove the '#' symbol

        // Find the target element in the document
        const targetElement = document.getElementById(targetId || "");

        // If the element exists, perform the slow scroll
        if (targetElement) {
          slowScrollTo(targetElement, 1000); // 1000ms = 1 second for smooth scroll duration
        }
      });
    });
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      <Hero />

      {/* Sections with unique IDs */}
      <div id="services">
        <Services />
      </div>

      <div id="satisfaction">
        <Satisfaction />
      </div>

      <div id="social-area">
        <SocialArea />
      </div>

      <div id="content">
        <Content />
      </div>

      <div id="frame-insights">
        <FrameInsights />
      </div>

      <div id="website">
        <Website />
      </div>

      <div id="poster">
        <Poster />
      </div>

      <div id="form-area">
        <FormArea />
      </div>

      <div id="blogs">
        <Blogs />
      </div>

      <div id="contact">
        <SectionWithContactForm />
      </div>

      <div id="testimonials">
        <Testimonials />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
