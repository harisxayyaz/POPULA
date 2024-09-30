"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProfileButton from "./_components/ProfileButton";

const ProfileManagement = () => {
  const [imageUrl, setImageUrl] = useState(""); // State to hold the image URL

  // State to hold form values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.imageUrl);
          console.log("Photo URL fetched successfully");
        } else {
          console.error("Failed to fetch photo:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();
  }, []); // Run only once on mount

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent form from refreshing the page
    console.log(formData); // Log form data to the console
     const token = localStorage.getItem("token"); // Replace 'your_token_key' with the actual key you used to store the token.

     // Set up the fetch options
     const fetchOptions = {
       method: "PUT",
       headers: {
         "Content-Type": "application/json", // Assuming you're sending JSON data
         Authorization: `Bearer ${token}`, // Add your authorization token here
       },
       body: JSON.stringify(formData), // Convert form data to JSON
     };

     try {
       const response = await fetch(
         "http://localhost:5000/api/user/profile",
         fetchOptions
       ); // Replace with your API endpoint

       if (!response.ok) {
         throw new Error(`Error: ${response.status} - ${response.statusText}`);
       }

       const result = await response.json(); // Parse the response JSON
       console.log("Success:", result); // Handle the response
     } catch (error) {
       console.error("Error occurred while submitting form data:", error);
     }
  };

  return (
    <div className="max-h-screen w-full overflow-y-scroll bg-gray-50 p-6">
      <Navbar title="Profile Management" description="Manage your profile" />
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Profile</h1>

        <div className="flex gap-8 py-8 bg-white shadow-lg rounded-lg p-6">
          <div className="relative w-48 h-48">
            <Image
              src={imageUrl || "/placeholder.png"} // Fallback image
              layout="fill"
              objectFit="cover"
              alt="Profile"
              className="rounded-full border-4 border-purple-600"
            />
          </div>
          <div className="flex flex-col justify-center gap-3">
            <ProfileButton title="Update Profile Photo" />
            <ProfileButton title="Delete Profile Photo" />
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <form className="space-y-6 w-full max-w-md" onSubmit={handleSubmit}>
            <img
              src="/logo.svg"
              alt="logo"
              className="h-12 block md:hidden mb-4"
            />

            {/* First Name and Last Name */}
            <div className="flex space-x-4">
              <div className="relative w-1/2">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="First Name"
                  className="w-full h-10 text-md px-3 text-black bg-transparent border border-purple-600 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
                />
              </div>

              <div className="relative w-1/2">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder="Last Name"
                  className="w-full h-10 text-md px-3 text-black bg-transparent border border-purple-600 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Email"
                className="w-full h-10 text-md px-3 text-black bg-transparent border border-purple-600 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
              />
            </div>

            {/* Date of Birth */}
            <div className="relative">
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
                className="w-full h-10 text-md px-3 text-black bg-transparent border border-purple-600 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
              />
            </div>

            {/* Submit Button */}
            <div className="relative">
              <button
                type="submit"
                className="w-full h-10 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
