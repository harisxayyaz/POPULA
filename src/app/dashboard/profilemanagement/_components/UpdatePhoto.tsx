"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdatePhoto: React.FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [secureUrl, setSecureUrl] = useState<string>("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const handlePhotoUpload = async () => {
    if (photo) {
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", "popula"); // Replace with your Cloudinary upload preset

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/danwedxip/image/upload",
          formData
        );
        setSecureUrl(response.data.secure_url); // Set the secure URL after uploading the photo
        console.log("Photo uploaded to Cloudinary successfully");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // Use useEffect to make the API call after secureUrl is updated
  useEffect(() => {
    if (secureUrl) {
      const updatePhotoInBackend = async () => {
        try {
          const token = localStorage.getItem("token"); // Retrieve token from localStorage
          const response = await fetch(
            "https://popula-backend-efc1.onrender.com/api/user/update-photo",
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
              window.location.reload();
            }, 1000);
          } else {
            console.error("Error updating photo URL in backend");
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };

      updatePhotoInBackend();
    }
  }, [secureUrl]); // Trigger the API call when secureUrl changes

  return (
    <div>
      <input type="file" accept="image/*" onChange={handlePhotoChange} />
      <button onClick={handlePhotoUpload} disabled={!photo}>
        Upload Photo
      </button>
    </div>
  );
};

export default UpdatePhoto;
