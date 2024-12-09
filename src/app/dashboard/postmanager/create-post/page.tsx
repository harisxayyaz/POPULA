"use client";
import Navbar from "@/components/Navbar";
import React, { useState, ChangeEvent } from "react";
import CheckboxCard from "./_components/CheckboxCard";
import { Button } from "@/components/ui/button";
import PostCard from "./_components/PostCard";
import { useRouter } from "next/navigation"; // For navigation

type Props = {};

const CreatePost = (props: Props) => {
  const [caption, setCaption] = useState<string>(""); // State for caption
  const [media, setMedia] = useState<File | null>(null); // State for media
  const [mediaUrl, setMediaUrl] = useState<string | null>(null); // State for media URL
  const [loading, setLoading] = useState<boolean>(false); // State for loader
  const [success, setSuccess] = useState<boolean>(false); // State for success
  const [error, setError] = useState<string | null>(null); // State for error message
  const [descriptionText, setDescriptionText] = useState<string>(""); // New state for description below "Use Description" button
  const router = useRouter();

  const handleCaptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  const handleDescriptionTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionText(e.target.value); // Handle changes to the new description text
  };

  const generateCaption = async () => {
    if (caption) {
      try {
        setLoading(true);
        const response = await fetch(
          "https://popula-ad-content.onrender.com/generate_content",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "Product Description": caption,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to generate ad content");
        }
        const data = await response.json();
        setCaption(data.ad_content); // Update caption with AI-generated content
      } catch (error) {
        console.error("Error generating ad content:", error);
        setError("Failed to generate ad content. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleMediaUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setMedia(file);
      // Simulating media upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
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
        setMediaUrl(data.url); // Save the uploaded media URL
      } catch (error) {
        console.error("Error uploading media:", error);
      }
    }
  };

const copyDescription = () => {
    setDescriptionText(caption); // Copy the caption to the description
}

  const generateWithAI = async () => {
    const brandName = "POPULA"; // Hardcoded brand name

    try {
      setLoading(true); // Show loader

      // Send the data to the AI generation API
      const response = await fetch(
        "https://popula-ad-content.onrender.com/generate_poster",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "Product Description": descriptionText,
            "Brand Name": brandName,
          }),
        }
      );

      const data = await response.json();
      const aiImageUrl = data.image_url;

      // Upload AI-generated image to Cloudinary
      const formData = new FormData();
      formData.append("file", aiImageUrl);
      formData.append("upload_preset", "popula"); // Replace with your upload preset

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/danwedxip/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();
      setMediaUrl(cloudinaryData.url); // Set Cloudinary URL to mediaUrl
    } catch (error) {
      console.error(
        "Error generating AI poster or uploading to Cloudinary:",
        error
      );
      setError("Failed to generate image. Please try again.");
    } finally {
      setLoading(false); // Hide loader after request completion
    }
  };

    const [checkboxStates, setCheckboxStates] = useState<{
      [key: string]: boolean;
    }>({
      Facebook: false,
      Instagram: false,
    });

    const toggleCheckboxState = (key: string, newState: boolean) => {
      setCheckboxStates((prevState) => ({
        ...prevState,
        [key]: newState,
      }));
    };

  const postToFacebookAndInstagram = async (
    facebook: boolean,
    instagram: boolean
  ) => {
    setLoading(true);
    setError(null); // Reset error message if any

    const accessToken =
      "EAB1XqldtBCQBO9ZBZC3RRnHyS1Fj55TvAZAoVBZCbRuTn8ZChRZBHCzurEmkYle8z4ZCxsT4K8yEbPyvsqHCJR9hhC0GeJXHA6A13U0jncODAim6PDGw5nHZBYHZCrkbgAG0UYakYL5WKUsEKzbXrdbVemkN8c1GgqbltZCX0Oo8y4dyobC2oNGZBQauFQBJGE3VQIP"; // Replace with your valid access token
    const instagramUserId = "17841466634260746"; // Replace with your Instagram user ID

    const facebookPostUrl = `https://graph.facebook.com/v15.0/me/photos?access_token=${accessToken}`;
    const instagramPostUrl = `https://graph.facebook.com/v20.0/${instagramUserId}/media?access_token=${accessToken}`;

    try {
      if (caption && mediaUrl) {
        if (facebook) {
          // Facebook Post
          const facebookResponse = await fetch(facebookPostUrl, {
            method: "POST",
            body: new URLSearchParams({
              caption,
              url: mediaUrl,
            }),
          });
          const facebookData = await facebookResponse.json();
          console.log("Facebook Post Response:", facebookData);
          if (!facebookResponse.ok) {
            throw new Error(
              `Facebook Post Error: ${
                facebookData.error?.message || "Unknown error"
              }`
            );
          }
        }

        if (instagram) {
          // Instagram Post - Create media container first
          const containerResponse = await fetch(instagramPostUrl, {
            method: "POST",
            body: JSON.stringify({
              image_url: mediaUrl, // Your image URL
              caption: caption, // Your caption
              access_token: accessToken,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const containerData = await containerResponse.json();
          if (!containerData.id) {
            throw new Error("Failed to create media container for Instagram.");
          }

          // Publish the media container to Instagram
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
          const publishData = await publishResponse.json();
          if (!publishData.id) {
            throw new Error("Failed to publish media to Instagram.");
          }

          console.log("Post published to Instagram successfully!");
        }

        // Show success toast and redirect
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard/postmanager");
        }, 2000); // Wait 2 seconds before redirect
      } else {
        setError("Caption or Media is missing.");
      }
    } catch (error) {
      console.error("Error posting to Facebook/Instagram:", error);
      setError("Failed to post. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-h-screen w-full overflow-hidden p-4">
      <Navbar title="Social Sphere" description="Create Post" />
      <section className="flex w-full h-full">
        {/* Scrollable Post Section */}
        <div
          id="post"
          className="p-4 flex flex-col pb-20 gap-4 rounded-lg overflow-y-scroll w-1/2"
        >
          <div className="bg-white p-4 space-y-2 rounded-lg">
            <h1 className="text-xl font-semibold">Post to</h1>
            <div className="grid grid-cols-3 gap-4 drop-shadow-sm justify-center items-center rounded-lg">
              <CheckboxCard
                imagePath="/admin/facebook.png"
                title="Facebook"
                checked={checkboxStates["Facebook"]}
                onToggle={(newState) =>
                  toggleCheckboxState("Facebook", newState)
                }
              />
              <CheckboxCard
                imagePath="/admin/instagram.png"
                title="Instagram"
                checked={checkboxStates["Instagram"]}
                onToggle={(newState) =>
                  toggleCheckboxState("Instagram", newState)
                }
              />
            </div>
          </div>

          <div className="bg-white gap-2 flex flex-col rounded-lg p-4">
            <h1 className="text-xl font-semibold">Description</h1>
            <h2>Add a description for your post</h2>
            <textarea
              className="w-full border rounded-lg h-40 p-2"
              value={caption}
              onChange={handleCaptionChange}
              placeholder="Write your caption here..."
            />
            <div className="flex gap-4">
              <Button
                className="bg-[#2A327D] w-36"
                disabled={!caption} // Disable button if no caption
                onClick={() => generateCaption()} // Trigger AI generation
              >
                {loading ? "Generating..." : "Let AI do the job"}
              </Button>
            </div>
          </div>

          <div className="bg-white gap-2 flex flex-col rounded-lg p-4">
            <h1 className="text-2xl font-semibold">Media</h1>
            <p>Share media</p>
            <div className="flex w-full justify-center gap-4">
              {/* Label wraps the button to trigger file input */}
              <Button
                className="bg-[#2A327D]"
                onClick={() => {
                  const mediaUploadElement =
                    document.getElementById("media-upload");
                  if (mediaUploadElement) {
                    mediaUploadElement.click();
                  }
                }}
              >
                Attach Media
              </Button>
              <input
                id="media-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleMediaUpload}
              />

              <Button className="bg-[linear-gradient(to_right,_#C9A101,_#5D0089)] w-36">
                Generate with AI
              </Button>
            </div>
            <div className="flex flex-col w-full justify-center items-center gap-4 mt-4">
              <Button
                onClick={() => copyDescription()}
                className="bg-[#2A327D] w-36"
              >
                Copy Description
              </Button>
              <textarea
                className="w-full border rounded-lg h-20 p-2"
                value={descriptionText}
                onChange={handleDescriptionTextChange} // Update the fixed description state
              />
              <Button
                className="bg-[linear-gradient(to_right,_#C9A101,_#5D0089)] w-36"
                onClick={generateWithAI} // Trigger AI generation
                disabled={loading}
              >
                {loading ? <span>Loading...</span> : "Generate with AI"}
              </Button>
            </div>
          </div>
        </div>

        {/* Fixed PostCard Section */}
        <div className="h-full flex gap-4 flex-col w-1/2 just items-center mt-8">
          <PostCard caption={caption} mediaUrl={mediaUrl} />
          <div className="w-full flex justify-center">
            <Button
              className="bg-[#2A327D]"
              onClick={()=>{postToFacebookAndInstagram(checkboxStates["Facebook"], checkboxStates["Instagram"])}}
              disabled={loading} // Disable button while posting
            >
              {loading ? <span>Loading...</span> : "Done"}
            </Button>
          </div>
        </div>
      </section>

      {success && (
        <div className="toast toast-success">Post published successfully!</div>
      )}
      {error && <div className="toast toast-error">{error}</div>}
    </div>
  );
};

export default CreatePost;
