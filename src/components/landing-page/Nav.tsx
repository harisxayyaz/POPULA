import React, { useState } from "react";
import Button from "./Button";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="flex flex-row items-center px-6 h-[110px] py-4 border-b relative">
      {/* Logo Section */}
      <div className="flex-1 min-w-[220px] pl-9">
        <img src="/logo.svg" alt="Logo" className="h-[90%] w-auto" />
      </div>

      {/* Links Section */}
      <div className="flex justify-center hidden md:flex overflow-x-hidden gap-8 text-[17px] px-[10%] font-inter pl-4">
        {[
          { label: "Services", href: "#services" },
          { label: "Content", href: "#content" },
          { label: "Business Insights", href: "#frame-insights" },
          { label: "Website Analysis", href: "#website" },
          { label: "Forms", href: "#form-area" },
          { label: "Contact Us", href: "#contact" },
          { label: "Blog", href: "#blogs" },
          { label: "Pricing", href: "#pricing" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-normal hover:font-bold hover:scale-105 hover:underline decoration-[#2A327D] transition-all duration-300 ease-in-out"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Hamburger Icon for small screens */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex mr-14 text-3xl"
        >
          ☰
        </button>
      </div>

      {/* Dropdown Menu for small screens */}
      <div
        className={`md:hidden ${
          isDropdownOpen ? "block" : "hidden"
        } absolute top-[110px] left-0 pl-5 right-0 bg-white shadow-md py-4`}
      >
        {[
          { label: "Services", href: "#services" },
          { label: "Content", href: "#content" },
          { label: "Business Insights", href: "#frame-insights" },
          { label: "Website Analysis", href: "#website" },
          { label: "Forms", href: "#form-area" },
          { label: "Contact Us", href: "#contact" },
          { label: "Blog", href: "#blogs" },
          { label: "Pricing", href: "#pricing" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="block px-6 py-2 font-normal hover:font-bold hover:scale-105 hover:underline decoration-[#2A327D] transition-all duration-300 ease-in-out"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Buttons Section */}
      <div className="flex-1 flex justify-end items-center gap-4 text-[17px] font-inter">
        <img
          src="/Search Icon.svg"
          alt="Search"
          className="h-[22.6px] w-[22.6px] hover:cursor-pointer"
        />
        <button onClick={()=>{window.location.href = "/login"}} className="px-4 py-3 max-h-[50px] min-w-[100px] rounded hover:bg-[#2A327D] hover:text-white transition-all duration-300">
          Log In
        </button>
        <Button text="Try it free" />
      </div>
    </nav>
  );
};

export default Navbar;
