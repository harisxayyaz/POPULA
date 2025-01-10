"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Navbar from "@/components/Navbar";
import { description } from "@/components/Barchart";

const steps = [
  { label: "Basic Information", id: "basic-info" },
  { label: "Social Media Configuration", id: "social-media" },
];

const BusinessConfiguration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading
  const [formData, setFormData] = useState({
    businessName: "",
    licenseNumber: "",
    domain: "",
    businessEmail: "",
    description: "",
    website: "",
    address: "",
    facebookPageId: "",
    instagramPageId: "",
    accessToken: "",
    totalLeads: 0,
    amountSpent: 0,
    status: "pending",
  });

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    if (currentStep === 2) {
      setSubmit(true);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    const token = localStorage.getItem("token");

    const payload = {
      businessName: formData.businessName,
      licenseNumber: formData.licenseNumber,
      domain: formData.domain,
      businessEmail: formData.businessEmail,
      description: formData.description,
      website: formData.website,
      address: formData.address,
      facebookPageId: formData.facebookPageId,
      instagramPageId: formData.instagramPageId,
      accessToken: formData.accessToken,
      totalLeads: formData.totalLeads || 0,
      amountSpent: formData.amountSpent || 0,
      status: formData.status,
    };

    try {
      const response = await fetch(
        "http://popula-backend-efc1.onrender.com/api/business",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error response:", errorResponse);
        throw new Error("Network response was not ok.");
      }

      console.log("Business configuration submitted successfully:");
      // Handle success
    } catch (error) {
      console.error("Error submitting business configuration:", error);
      // Handle error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    (e: any) => handleSubmit(e);
  }, [submit]);

  return (
    <div className="bg-[#f4f7fe] min-h-screen overflow-y-scroll p-6 w-full">
      <Navbar
        title="Business Configuration"
        description="Business Configuration"
      />

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
          <form
            className="space-y-6 px-20"
            onSubmit={
              currentStep === 1 ? handleSubmit : (e) => e.preventDefault()
            }
          >
            {currentStep === 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="businessName"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your business name"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="licenseNumber"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Business License Number
                    </label>
                    <input
                      type="text"
                      id="licenseNumber"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your license number"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="domain"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Business Domain
                    </label>
                    <input
                      type="text"
                      id="domain"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your business domain"
                      value={formData.domain}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="businessEmail"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Business Email
                    </label>
                    <input
                      type="email"
                      id="businessEmail"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your business email"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Business Description
                    </label>
                    <textarea
                      id="description"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your business description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={1}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="website"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Business Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your business website"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Business Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Enter your business address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="facebookPageId"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Facebook Page ID
                    </label>
                    <input
                      type="text"
                      id="facebookPageId"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your Facebook Page ID"
                      value={formData.facebookPageId}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="instagramPageId"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Instagram Page ID
                    </label>
                    <input
                      type="text"
                      id="instagramPageId"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter your Instagram Page ID"
                      value={formData.instagramPageId}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="accessToken"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Access Token
                  </label>
                  <input
                    type="text"
                    id="accessToken"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Enter your access token"
                    value={formData.accessToken}
                    onChange={handleChange}
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
                type={currentStep === 1 ? "submit" : "button"}
                onClick={currentStep === 1 ? undefined : handleNext}
                className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`} // Add styling for loading state
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12c0-1.1 0-2 .2-3A10 10 0 0112 2c1.1 0 2 .2 3 .2 0 1.1 0 2 .2 3-1 .1-1.9.2-3 1-1 1-1.8 2-3 3-1.2 1.2-2.9 2.2-3 3-.2 1-.2 1.9-.2 3a10 10 0 01-8-8c1.1 0 2 .2 3 .2 1.1 0 2-.2 3-.2z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : currentStep === 1 ? (
                  "Submit"
                ) : (
                  "Next"
                )}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default BusinessConfiguration;
