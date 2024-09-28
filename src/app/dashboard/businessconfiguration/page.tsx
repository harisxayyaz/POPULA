"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Navbar from "@/components/Navbar";

const steps = [
  { label: "Basic Information", id: "basic-info" },
  { label: "Social Media Configuration", id: "social-media" },
];

const BusinessConfiguration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="bg-[#f4f7fe] min-h-screen overflow-y-scroll p-6 w-full">
      <Navbar title="Business Configuration" description="Business Configuration"/>

      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <ul className="flex justify-around border-b border-gray-200 pb-2 mb-4">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={`cursor-pointer ${
                index === currentStep
                  ? "text-blue-500 font-semibold"
                  : "text-gray-600"
              }`}
              onClick={() => setCurrentStep(index)}
            >
              {step.label}
            </li>
          ))}
        </ul>

        <section>
          <form className="space-y-6 px-20">
            {currentStep === 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="business-name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="business-name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your business name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="license-number"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Business License Number
                    </label>
                    <input
                      type="text"
                      id="license-number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your license number"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="business-domain"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Business Domain
                    </label>
                    <input
                      type="text"
                      id="business-domain"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your business domain"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="business-email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Business Email
                    </label>
                    <input
                      type="email"
                      id="business-email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your business email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="business-description"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Business Description
                    </label>
                    <textarea
                      id="business-description"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your business description"
                      rows={1}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="business-website"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Business Website
                    </label>
                    <input
                      type="url"
                      id="business-website"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your business website"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="business-address"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Business Address
                  </label>
                  <input
                    type="text"
                    id="business-address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Enter your business address"
                  />
                </div>
              </>
            )}

            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="facebook-page-id"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Facebook Page ID
                    </label>
                    <input
                      type="text"
                      id="facebook-page-id"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your Facebook Page ID"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="instagram-page-id"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Instagram Page ID
                    </label>
                    <input
                      type="text"
                      id="instagram-page-id"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your Instagram Page ID"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="access-token"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Access Token
                  </label>
                  <input
                    type="text"
                    id="access-token"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Enter your access token"
                  />
                </div>
              </>
            )}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                disabled={currentStep === 0}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                disabled={currentStep === steps.length - 1}
              >
                Next
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default BusinessConfiguration;
