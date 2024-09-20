"use client";
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";

interface MediaPopupProps {
  onClose: () => void;
}

const MediaPopup: React.FC<MediaPopupProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [facebookChecked, setFacebookChecked] = useState<boolean>(false);
  const [instagramChecked, setInstagramChecked] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "popula"); // Replace with your upload preset
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/danwedxip/image/upload",
          formData
        );
        setImageUrl(response.data.secure_url);
        setStep(2); // Move to the next step after upload
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  interface FacebookResponse {
    id: string;
    post_id?: string;
  }

  interface InstagramMediaResponse {
    id: string;
  }

  interface InstagramPublishResponse {
    id: string;
  }

  // Function to post photo to Facebook
  async function postPhotoToFacebook(): Promise<void> {
    const facebookPageId = "370027042861373"; // Replace with your Page ID
    const pageAccessToken =
      "EAB1XqldtBCQBO7VQSxCCROElLORKMBZBSnKiUPcl2XC1kQdCQZCMfkpwZBf5oD0kyVqMwNLZA84Ll74bwBvKwh3glTRtIP6iI31Dw4Kf9WYZCHHiZB0KbG4GjxE39gzGyPNO1OxCtc0sCggAx5HLN6Yh0s49psPTvpDm4aSBr4YKuvSZCQB0Tuw5zznPXd77gA1"; // Replace with your Page access token

    const facebookUrl = `https://graph.facebook.com/v20.0/${facebookPageId}/photos`;

    const params = new URLSearchParams({
      url: imageUrl!,
      access_token: pageAccessToken,
      message: caption + "\nView Business Website: https://bit.ly/business_shop",
      published: "true",
    });

    try {
      const response: AxiosResponse<FacebookResponse> = await axios.post(
        `${facebookUrl}?${params.toString()}`
      );
      console.log("Photo posted to Facebook successfully:", response.data);
    } catch (error: any) {
      console.error(
        "Error posting photo on Facebook:",
        error.response ? error.response.data : error.message
      );
    }
  }

  // Function to post photo to Instagram
  async function postPhotoToInstagram(): Promise<void> {
    const accessToken =
      "EAB1XqldtBCQBO7VQSxCCROElLORKMBZBSnKiUPcl2XC1kQdCQZCMfkpwZBf5oD0kyVqMwNLZA84Ll74bwBvKwh3glTRtIP6iI31Dw4Kf9WYZCHHiZB0KbG4GjxE39gzGyPNO1OxCtc0sCggAx5HLN6Yh0s49psPTvpDm4aSBr4YKuvSZCQB0Tuw5zznPXd77gA1";
    const instagramUserId = "17841466634260746"; // Replace with your Instagram user ID

    try {
      // Step 1: Create a media container
      const containerResponse: AxiosResponse<InstagramMediaResponse> =
        await axios.post(
          `https://graph.facebook.com/v20.0/${instagramUserId}/media`,
          {
            image_url: imageUrl!,
            caption:
              caption + "View Business Website: https://bit.ly/business_shop",
            access_token: accessToken,
          }
        );
      const containerData = containerResponse.data;
      if (!containerData.id) {
        throw new Error("Failed to create media container.");
      }

      // Step 2: Publish the media container
      const publishResponse: AxiosResponse<InstagramPublishResponse> =
        await axios.post(
          `https://graph.facebook.com/v20.0/${instagramUserId}/media_publish`,
          {
            creation_id: containerData.id,
            access_token: accessToken,
          }
        );
      const publishData = publishResponse.data;
      if (!publishData.id) {
        throw new Error("Failed to publish media.");
      }

      console.log("Post published to Instagram successfully!");
    } catch (error: any) {
      console.error(
        "Error posting to Instagram:",
        error.response ? error.response.data : error.message
      );
    }
  }

  const handlePublish = async () => {
    if (!imageUrl || (!facebookChecked && !instagramChecked)) {
      alert("Please upload an image and select at least one social platform.");
      return;
    }

    setPosting(true); // Start the loader

    // If Facebook is selected
    if (facebookChecked) {
      await postPhotoToFacebook();
    }

    // If Instagram is selected
    if (instagramChecked) {
      await postPhotoToInstagram();
    }

    setPosting(false); // Stop the loader
    setSuccessMessage("Post published successfully!"); // Show success message
    setTimeout(() => {
      setSuccessMessage(null); // Clear the success message after 3 seconds
      onClose(); // Close the popup after publishing
    }, 3000);
  };

  return (
    <main className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-1/2 h-3/4 p-6 flex flex-col rounded-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <img src="/cross.svg" alt="Close" className="w-6 h-6" />
        </button>

        {/* Step Indicator */}
        <div className="flex justify-between mb-4">
          {["Select Photo", "Add Details", "Select Socials"].map(
            (label, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 ${
                  step === index + 1
                    ? "text-blue-500 font-semibold"
                    : "text-gray-600"
                }`}
              >
                <div
                  className={`w-6 h-6 flex items-center justify-center rounded-full ${
                    step === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <span>{label}</span>
              </div>
            )
          )}
        </div>

        {/* Step Content */}
        <div className="flex-1 flex flex-col justify-between">
          {step === 1 && (
            <div className="flex flex-col space-y-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Enter caption"
                className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id="facebook"
                  checked={facebookChecked}
                  onChange={() => setFacebookChecked(!facebookChecked)}
                />
                <label htmlFor="facebook">Post to Facebook</label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id="instagram"
                  checked={instagramChecked}
                  onChange={() => setInstagramChecked(!instagramChecked)}
                />
                <label htmlFor="instagram">Post to Instagram</label>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  Back
                </button>
                <button
                  onClick={handlePublish}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  {posting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
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
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                      Posting...
                    </span>
                  ) : (
                    "Publish"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
            <div className="bg-green-100 text-green-700 p-4 rounded-lg">
              {successMessage}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MediaPopup;
