"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const steps = [
  { label: "Basic Information", id: "basic-info" },
  { label: "Bank Info", id: "bank-info" },
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
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-sm text-gray-500">
            Pages / Business Configuration
          </h1>
          <h1 className="text-2xl font-semibold text-gray-800 mt-1">
            Business Configuration
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search"
            className="border rounded-full px-4 py-2 placeholder-gray-400 w-64"
          />
          <img
            src="/notifications.svg"
            alt="Notifications"
            className="w-6 h-6"
          />
          <img src="/moon.svg" alt="Theme" className="w-6 h-6" />
          <img src="/info.svg" alt="Info" className="w-6 h-6" />
          <img
            src="/Profile.svg"
            alt="Profile"
            className="w-8 h-8 cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
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
                      htmlFor="bank-name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Bank Name
                    </label>
                    <input
                      type="text"
                      id="bank-name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your bank name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="account-number"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Account Number
                    </label>
                    <input
                      type="text"
                      id="account-number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your account number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="account-holder"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      id="account-holder"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter the account holder's name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bank-address"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Bank Address
                    </label>
                    <input
                      type="text"
                      id="bank-address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your bank's address"
                    />
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="facebook-api-key"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Facebook API Key
                    </label>
                    <input
                      type="text"
                      id="facebook-api-key"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your Facebook API key"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="instagram-api-key"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Instagram API Key
                    </label>
                    <input
                      type="text"
                      id="instagram-api-key"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your Instagram API key"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-between mt-6">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                  Previous Step
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                {currentStep === steps.length - 1 ? "Submit" : "Next Step"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default BusinessConfiguration;
