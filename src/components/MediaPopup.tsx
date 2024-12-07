"use client";
import React, { useState } from "react";

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
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/danwedxip/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        setImageUrl(data.secure_url);
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
      "EAB1XqldtBCQBO9ZBZC3RRnHyS1Fj55TvAZAoVBZCbRuTn8ZChRZBHCzurEmkYle8z4ZCxsT4K8yEbPyvsqHCJR9hhC0GeJXHA6A13U0jncODAim6PDGw5nHZBYHZCrkbgAG0UYakYL5WKUsEKzbXrdbVemkN8c1GgqbltZCX0Oo8y4dyobC2oNGZBQauFQBJGE3VQIP"; // Replace with your Page access token

    const facebookUrl = `https://graph.facebook.com/v20.0/${facebookPageId}/photos`;

    const params = new URLSearchParams({
      url: imageUrl!,
      access_token: pageAccessToken,
      message:
        caption + "\nView Business Website: https://bit.ly/business_shop",
      published: "true",
    });

    try {
      const response = await fetch(`${facebookUrl}?${params.toString()}`, {
        method: "POST",
      });
      const data: FacebookResponse = await response.json();
      console.log("Photo posted to Facebook successfully:", data);
    } catch (error: any) {
      console.error("Error posting photo on Facebook:", error.message);
    }
  }

  // Function to post photo to Instagram
  async function postPhotoToInstagram(): Promise<void> {
    const accessToken =
      "EAB1XqldtBCQBO9ZBZC3RRnHyS1Fj55TvAZAoVBZCbRuTn8ZChRZBHCzurEmkYle8z4ZCxsT4K8yEbPyvsqHCJR9hhC0GeJXHA6A13U0jncODAim6PDGw5nHZBYHZCrkbgAG0UYakYL5WKUsEKzbXrdbVemkN8c1GgqbltZCX0Oo8y4dyobC2oNGZBQauFQBJGE3VQIP";
    const instagramUserId = "17841466634260746"; // Replace with your Instagram user ID

    try {
      // Step 1: Create a media container
      const containerResponse = await fetch(
        `https://graph.facebook.com/v20.0/${instagramUserId}/media`,
        {
          method: "POST",
          body: JSON.stringify({
            image_url: imageUrl!,
            caption:
              caption + "View Business Website: https://bit.ly/business_shop",
            access_token: accessToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const containerData: InstagramMediaResponse =
        await containerResponse.json();
      if (!containerData.id) {
        throw new Error("Failed to create media container.");
      }

      // Step 2: Publish the media container
      const publishResponse = await fetch(
        `https://graph.facebook.com/v20.0/${instagramUserId}/media_publish`,
        {
          method: "POST",
          body: JSON.stringify({
            creation_id: containerData.id,
            access_token: accessToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const publishData: InstagramPublishResponse =
        await publishResponse.json();
      if (!publishData.id) {
        throw new Error("Failed to publish media.");
      }

      console.log("Post published to Instagram successfully!");
    } catch (error: any) {
      console.error("Error posting to Instagram:", error.message);
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
      {/* Your component JSX */}
    </main>
  );
};

export default MediaPopup;
