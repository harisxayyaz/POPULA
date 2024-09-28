import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface ProfileButtonProps {
  title: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ title }) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [secureUrl, setSecureUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false); // New state for upload status

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedPhoto = e.target.files[0];
      setPhoto(selectedPhoto);
      handlePhotoUpload(selectedPhoto); // Trigger upload immediately after selection
    }
  };

  const handlePhotoUpload = async (selectedPhoto: File) => {
    const formData = new FormData();
    formData.append("file", selectedPhoto);
    formData.append("upload_preset", "popula"); // Replace with your Cloudinary upload preset

    setIsUploading(true); // Set uploading state to true

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/danwedxip/image/upload",
        formData
      );
      setSecureUrl(response.data.secure_url); // Set the secure URL after uploading the photo
      console.log("Photo uploaded to Cloudinary successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false); // Reset the uploading state
    }
  };

  // Use useEffect to make the API call after secureUrl is updated
  useEffect(() => {
    if (secureUrl) {
      const updatePhotoInBackend = async () => {
        try {
          const token = localStorage.getItem("token"); // Retrieve token from localStorage
          const response = await fetch(
            "http://localhost:5000/api/user/update-photo",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Send the token in Authorization header
              },
              body: JSON.stringify({
                secure_url: secureUrl, // Send the secure_url in the request body
              }),
            }
          );

          if (response.ok) {
            console.log("Photo URL updated in backend successfully");
            setTimeout(() => {
              window.location.reload(); // Refresh the page after successful update
            }, 1000);
          } else {
            console.error("Error updating photo URL in backend");
          }
        } catch (error) {
          console.error("Error updating photo URL in backend:", error);
        }
      };

      updatePhotoInBackend();
    }
  }, [secureUrl]); // Trigger the API call when secureUrl changes

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        style={{ display: "none" }} // Hide the input
        id="fileInput"
      />
      <Button
        className="w-40"
        variant="outline"
        onClick={() => document.getElementById("fileInput")?.click()} // Trigger file input on button click
        disabled={isUploading} // Disable button while uploading
      >
        {isUploading ? "Uploading..." : title} {/* Show loading message */}
      </Button>
    </div>
  );
};

export default ProfileButton;
