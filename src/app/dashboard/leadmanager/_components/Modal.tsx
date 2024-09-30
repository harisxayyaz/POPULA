import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const Modal = () => {
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    company: "",
    country: "",
    status: "Pending",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [disable, setDisable] = useState(false);

  const createLead = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        throw new Error("Failed to create lead");
      }

      const data = await response.json();
      console.log("Lead created successfully:", data);
      setSuccessMessage("Lead submitted successfully!");
      setDisable(true);
      setTimeout(() => {
        window.location.reload(); // Refresh the page after 2 seconds
      }, 50);
    } catch (error) {
      setErrorMessage("Error creating lead. Please try again.");
    }
  };

  const handleInputChange = (e:any) => {
    const { id, value } = e.target;
    setLeadData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrorMessage(""); // Reset error message on input change
  };

  const validateInputs = () => {
    if (
      !leadData.name ||
      !leadData.email ||
      !leadData.phoneNumber ||
      !leadData.company ||
      !leadData.country
    ) {
      setErrorMessage("All fields are required.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    if (!emailPattern.test(leadData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    const phonePattern = /^[0-9]{10}$/; // Validate phone number (10 digits)
    if (!phonePattern.test(leadData.phoneNumber)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (validateInputs()) {
      createLead();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
          Add New Lead +
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Lead</DialogTitle>
        </DialogHeader>

        {/* Error and Success Messages */}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        {successMessage && (
          <div className="text-green-500">{successMessage}</div>
        )}

        {/* Input fields for name, email, and phone number */}
        <div className="space-y-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              id="name"
              value={leadData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              id="email"
              value={leadData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="phoneNumber" className="font-semibold">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              value={leadData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="country" className="font-semibold">
              Country
            </label>
            <input
              id="country"
              value={leadData.country}
              onChange={handleInputChange}
              placeholder="Enter Country"
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="company" className="font-semibold">
              Platform
            </label>
            <input
              id="company"
              value={leadData.company}
              onChange={handleInputChange}
              placeholder="Enter Platform"
              className="border p-2 rounded-md w-full"
            />
          </div>
        </div>

        {/* Dialog Footer with Save and Close buttons */}
        <DialogFooter className="flex justify-end space-x-2 mt-4">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Save
          </button>
          <DialogClose asChild>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition">
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
