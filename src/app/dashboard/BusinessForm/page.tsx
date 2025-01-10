"use client";
import React, { useState } from "react";
import axios from "axios";

const BusinessForm = () => {
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
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
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
          body: JSON.stringify(payload), // Send the payload directly
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json(); // Get the error response
        console.error("Error response:", errorResponse); // Log the error response
        throw new Error("Network response was not ok.");
      }

      console.log("Business configuration submitted successfully:");
      // Handle success
    } catch (error) {
      console.error("Error submitting business configuration:", error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Business Name:
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          License Number:
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Domain:
          <input
            type="text"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Business Email:
          <input
            type="email"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Website:
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Facebook Page ID:
          <input
            type="text"
            name="facebookPageId"
            value={formData.facebookPageId}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Instagram Page ID:
          <input
            type="text"
            name="instagramPageId"
            value={formData.instagramPageId}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Access Token:
          <input
            type="text"
            name="accessToken"
            value={formData.accessToken}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Total Leads:
          <input
            type="number"
            name="totalLeads"
            value={formData.totalLeads}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Amount Spent:
          <input
            type="number"
            name="amountSpent"
            value={formData.amountSpent}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BusinessForm;
