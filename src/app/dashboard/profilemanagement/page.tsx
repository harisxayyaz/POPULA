"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProfileButton from "./_components/ProfileButton";
import UpdatePhoto from "./_components/UpdatePhoto";

const ProfileManagement = () => {
  const [imageUrl, setImageUrl] = useState(""); // State to hold the image URL

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json(); // Parse the JSON response
          setImageUrl(data.imageUrl); // Set the image URL state
          console.log("Photo URL fetched successfully");
        } else {
          console.error("Failed to fetch photo:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();
  }, [imageUrl]); // Empty dependency array to run only on mount

  return (
    <div className="max-h-screen w-full overflow-y-scroll p-4">
      <Navbar title="Profile Management" description="Profile Management" />
      <div className="flex flex-col justify-center items-center mt-8">
        <h1 className="self-center text-2xl font-bold">Edit Profile</h1>

        <div className="flex gap-6 py-8">
          {/* Use the state variable for the image source */}
          <Image
            src={
              imageUrl 
            } // Fallback image if URL is empty
            width={200}
            height={200}
            alt="Profile"
          />
          <div className="flex flex-col justify-center gap-3">
            <ProfileButton title="Update Profile Photo" />
            <ProfileButton title="Delete Profile Photo" />
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <form className="space-y-6 w-full max-w-md">
            <img src="/logo.svg" alt="logo" className="h-12 block md:hidden" />

            {/* First Name and Last Name */}
            <div className="flex space-x-4">
              <div className="relative w-1/2">
                <input
                  type="text"
                  required
                  className="w-full h-10 text-md px-2 text-black bg-transparent border border-purple rounded-md outline-none peer"
                />
                <label className="absolute top-1/2 left-1 text-sm text-black px-2 pointer-events-none transform -translate-y-1/2 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:bg-white peer-valid:top-0 peer-valid:text-sm peer-valid:bg-white">
                  First Name
                </label>
              </div>

              <div className="relative w-1/2">
                <input
                  type="text"
                  required
                  className="w-full h-10 text-md px-2 text-black bg-transparent border border-purple rounded-md outline-none peer"
                />
                <label className="absolute top-1/2 left-1 text-sm text-black px-2 pointer-events-none transform -translate-y-1/2 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:bg-white peer-valid:top-0 peer-valid:text-sm peer-valid:bg-white">
                  Last Name
                </label>
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                required
                className="w-full h-10 text-md px-2 text-black bg-transparent border border-purple rounded-md outline-none peer"
              />
              <label className="absolute top-1/2 left-1 text-sm text-black px-2 pointer-events-none transform -translate-y-1/2 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:bg-white peer-valid:top-0 peer-valid:text-sm peer-valid:bg-white">
                Email
              </label>
            </div>

            {/* Date of Birth */}
            <div className="relative">
              <input
                type="date"
                required
                className="w-full h-10 text-md px-2 text-black bg-transparent border border-purple rounded-md outline-none peer"
              />
            </div>

            {/* Submit Button */}
            <div className="relative">
              <button
                type="submit"
                className="w-full h-10 bg-red-500 text-white rounded-md hover:bg-red-700"
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
