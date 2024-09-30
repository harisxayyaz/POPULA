import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { Terminal } from "lucide-react";
import { CaptionModal } from "./CaptionModal";
import { useAppSelector } from "@/redux/store/hooks";
import { HashtagsModal } from "./HashtagsModal";

interface FacebookResponse {
  id: string;
  post_id?: string;
}

type Platform = "Facebook" | "Instagram";

const PostModal: React.FC = () => {
  const [step, setStep] = useState<number>(1); // Track the current step
  const [media, setMedia] = useState<File | null>(null); // State for media uploads
  const [mediaUrl, setMediaUrl] = useState<string | null>(null); // State for media URL after upload
  const [caption, setCaption] = useState<string>(""); // State for the caption
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]); // State for platforms
  const platforms: Platform[] = ["Facebook", "Instagram"]; // List of platforms
  const [isNextDisabled, setIsNextDisabled] = useState(true); // Disable the Next button
  const [isLoading, setIsLoading] = useState(false);
  const [posted, isPosted] = useState(false);
  const { captionRedux } = useAppSelector((state) => state.business); // Fetch caption from Redux

  // Monitor changes in captionRedux and update local caption state
  useEffect(() => {
    if (captionRedux) {
      setCaption(captionRedux); // Update caption when captionRedux changes
    }
  }, [captionRedux]);

  const handleUpload = async () => {
    if (media) {
      setStep(2);
      const formData = new FormData();
      formData.append("file", media);
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
        setMediaUrl(data.url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // Handle media upload
  const handleMediaUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setMedia(file);
    setIsNextDisabled(!file); // Disable Next button if no file is selected
  };

  // Handle caption change
  const handleCaptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  // Handle platform selection
  const handlePlatformChange = (platform: Platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  async function postPhotoToFacebook(): Promise<void> {
    const facebookPageId = "370027042861373";
    const pageAccessToken =
      "EAB1XqldtBCQBOZBfEI9F78Wp1jhyR2H1azhVC19xUIpDPMMD9I62ytgFsKlkR2ZCgT2PQVU5cr5ZBtCNtcnqm0kw6ZCuBWgikG5tK4IlAOetlszF0ZBbnauV1yLx5K6KNHJNAw8So9Ft15R0McuetTKZB5AgmpZBKZBKsZC0bu4nYWprhxuoTZAvfxqwt6QNzZAzZCPe";

    const facebookUrl = `https://graph.facebook.com/v20.0/${facebookPageId}/photos`;

    const params = new URLSearchParams({
      url: mediaUrl!,
      access_token: pageAccessToken,
      message:
        caption + "\nView Business Website: https://bit.ly/business_shop",
      published: "true",
    });

    setIsLoading(true);

    try {
      const response = await fetch(`${facebookUrl}?${params.toString()}`, {
        method: "POST",
      });
      const data: FacebookResponse = await response.json();
      setIsLoading(false);
      isPosted(true);
      setStep(4);
    } catch (error: any) {
      console.error("Error posting photo on Facebook:", error.message);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex bg-white items-center justify-center w-[248px] h-[100px] rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer gap-4">
          <Image src="/plusicon.svg" width={50} height={50} alt="eye" />
          Create Post
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>

        {/* Step 1: Upload Media */}
        {step === 1 && (
          <div>
            <p className="mb-4">Step 1: Select a photo to upload</p>
            <label
              htmlFor="media-upload"
              className={`flex items-center justify-center w-full h-48 bg-gray-200 border-dashed border-2 border-gray-400 rounded-md cursor-pointer transition-all ${
                media ? "hidden" : "flex"
              }`}
            >
              <span>Select a photo</span>
            </label>
            <input
              id="media-upload"
              type="file"
              accept="image/*"
              onChange={handleMediaUpload}
              className="hidden"
            />
            {media && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(media)}
                  alt="Preview"
                  className="max-h-48 w-full object-cover rounded-md"
                />
              </div>
            )}
            <div className="flex justify-between px-4 mt-4">
              <button
                disabled
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Back
              </button>

              <button
                onClick={handleUpload}
                disabled={isNextDisabled}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Enter Caption */}
        {step === 2 && (
          <div>
            <p className="mb-4">Step 2: Enter your caption</p>
            <textarea
              value={caption}
              onChange={handleCaptionChange}
              placeholder="Write your caption here..."
              className="w-full border p-2 rounded-md mb-4"
              rows={4}
            />
            <div className="p-4 flex justify-center gap-4">
              <CaptionModal />
              <HashtagsModal/>
            </div>
            <div className="flex justify-between px-4">
              <button
                onClick={() => setStep(step - 1)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setStep(3);
                  console.log(captionRedux);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Select Platforms */}
        {step === 3 && (
          <div>
            <p className="mb-4">Step 3: Select platforms to post</p>
            <div className="space-y-2 mb-4">
              {platforms.map((platform) => (
                <div key={platform}>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedPlatforms.includes(platform)}
                      onChange={() => handlePlatformChange(platform)}
                      className="form-checkbox"
                    />
                    <span className="ml-2">{platform}</span>
                  </label>
                </div>
              ))}
            </div>
            <button
              disabled={isLoading}
              onClick={postPhotoToFacebook}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div>
            <p className="mb-4">Post Successful!</p>
            <Alert>
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your post has been successfully published.
              </AlertDescription>
            </Alert>
            <div className="flex justify-between px-4 mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                onClick={() => setStep(1)} // Reset to Step 1
              >
                Create Another Post
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;