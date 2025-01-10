"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { FaPencilAlt, FaSave } from "react-icons/fa";

interface Business {
  businessName: string;
  licenseNumber: string;
  domain: string;
  businessEmail: string;
  description?: string;
  website?: string;
  address?: string;
  facebookPageId?: string;
  instagramPageId?: string;
  totalLeads?: number;
  amountSpent?: number;
  status: string;
}

const BusinessProfile: React.FC = () => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Business>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://popula-backend-efc1.onrender.com/api/business/my-business",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setBusiness(data);
          setFormData(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch business data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching business data:", error);
        setError("Error fetching business data");
      }
    };
    fetchBusiness();
  }, []);

  const handleEdit = (field: keyof Business) => {
    setEditingField(field);
  };

  const handleSave = async (field: keyof Business) => {
    if (business) {
      setBusiness({ ...business, [field]: formData[field] });
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "http://popula-backend-efc1.onrender.com/api/business/66f7fdcbdf10fd79bf5c094c",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error("Error occurred while submitting form data:", error);
      }
    }
    setEditingField(null);
  };

  const handleChange = (field: keyof Business, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const renderField = (
    field: keyof Business,
    label: string,
    value: string | number | undefined
  ) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="flex items-center">
          {editingField === field ? (
            <>
              <input
                type="text"
                value={formData[field] as string}
                onChange={(e) => handleChange(field, e.target.value)}
                className="flex-1 border rounded-md p-2"
              />
              <button
                onClick={() => handleSave(field)}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                <FaSave />
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={value || "N/A"}
                readOnly
                className="flex-1 border rounded-md p-2 bg-gray-100 cursor-pointer"
                onClick={() => handleEdit(field)}
              />
              <button
                onClick={() => handleEdit(field)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <FaPencilAlt />
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#f4f7fe] min-h-screen overflow-y-scroll p-6 w-full">
      <Navbar title="Business Profile" description="Profile" />
      <div className="flex flex-col items-center mt-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          {business ? (
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {business.businessName}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField(
                  "licenseNumber",
                  "License Number",
                  business.licenseNumber
                )}
                {renderField("domain", "Domain", business.domain)}
                {renderField("businessEmail", "Email", business.businessEmail)}
                {renderField(
                  "description",
                  "Description",
                  business.description || ""
                )}
                {renderField("website", "Website", business.website || "")}
                {renderField("address", "Address", business.address || "")}
                {renderField(
                  "facebookPageId",
                  "Facebook Page ID",
                  business.facebookPageId || ""
                )}
                {renderField(
                  "instagramPageId",
                  "Instagram Page ID",
                  business.instagramPageId || ""
                )}
                {renderField(
                  "totalLeads",
                  "Total Leads",
                  business.totalLeads || 0
                )}
                {renderField(
                  "amountSpent",
                  "Amount Spent",
                  business.amountSpent || 0
                )}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">
              No business details found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
