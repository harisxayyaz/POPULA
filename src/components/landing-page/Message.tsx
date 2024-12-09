// SectionWithContactForm.tsx
"use client";
import React from "react";
import Button from "./Button";

const SectionWithContactForm: React.FC = () => {
  return (
    <section className="bg-[#BDB1C2] mt-20 py-16 px-8">
      <div className="flex justify-center my -[5%] items-center w-full">
        {/* Centered container */}
        <div className="flex w-[80%] justify-between items-center space-x-8">
          {/* First div (2/5 width) */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="font-semibold">Get In touch with us.</h2>
            <h2 className="font-semibold mb-6">We are here to assist you!</h2>
            <h4>
              Get in touch with us. We're here to assist you! Whether you have
              questions, need support, or want to learn more about our services,
              our team is ready to help. Contact us anytime, and let us provide
              the solutions you need. We're just a message away!
            </h4>
          </div>

          {/* Second div (3/5 width) */}
          <div className="md:w-1/2">
            <form className="space-y-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              {/* Message Input */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-sm mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Enter your message"
                />
              </div>

              {/* Submit Button */}
              <div className="text-right">
                <Button text="Leave a message" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWithContactForm;
