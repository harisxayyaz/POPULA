"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const SocialMediaFeed: React.FC = () => {
  const [feedData, setFeedData] = useState<any[]>([]);
  const [currentPostId, setCurrentPostId] = useState<string>("");
  const [currentPlatform, setCurrentPlatform] = useState<string>("facebook");
  const [loading, setLoading] = useState<boolean>(false);
  const [newCaption, setNewCaption] = useState<string>("");

  const accessToken =
    "EAB1XqldtBCQBO6dlX2TJEr8hfUTuVqlL2BhmIKp0P2jnsODeWPs5Wmegrw3XjwwTDzdqNcct0jEqldcXwKO0xQSmZCEjbbQ7kvSNpEiOL6illb9iDTiGJAhTWYaMMCadZAZBZCCuXdAr5aEr4RijqI003XHTtk6TGavKbeQHotbgprnweluB2CPTMxZBPEdkqtEvfLXnZCExRnwmOHSSYWECghIAZDZD";

  useEffect(() => {
    fetchFacebookFeed();
    fetchInstagramFeed();
  }, []);

  const fetchFacebookFeed = async () => {
    setLoading(true);
    const pageId = "370027042861373";

    try {
      const response = await fetch(
        `https://graph.facebook.com/v20.0/${pageId}/feed?fields=message,story,created_time,attachments{media},id&access_token=${accessToken}`
      );
      const data = await response.json();
      displayFeed(data, "facebook");
    } catch (error) {
      console.error("Error fetching Facebook feed:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstagramFeed = async () => {
    setLoading(true);
    const userId = "17841466634260746";

    try {
      const response = await fetch(
        `https://graph.facebook.com/v20.0/${userId}/media?fields=caption,media_url,timestamp,permalink&access_token=${accessToken}`
      );
      const data = await response.json();
      displayFeed(data, "instagram");
    } catch (error) {
      console.error("Error fetching Instagram feed:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayFeed = (data: any, platform: string) => {
    const feedItems = data.data.map((item: any) => ({
      id: item.id,
      message: item.message || item.caption || "No Caption",
      createdTime: new Date(
        item.created_time || item.timestamp
      ).toLocaleString(),
      media:
        platform === "facebook"
          ? item.attachments?.data[0]?.media?.image?.src
          : item.media_url,
      permalink:
        platform === "instagram"
          ? item.permalink
          : `https://www.facebook.com/${item.id}`,
    }));

    setFeedData((prev) => [...prev, ...feedItems]);
  };

  const toggleFeed = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPlatform(e.target.value);
    setFeedData([]); // Clear feed data for the new platform
    if (e.target.value === "instagram") {
      fetchInstagramFeed();
    } else {
      fetchFacebookFeed();
    }
  };

  const openModal = (postId: string, platform: string) => {
    setCurrentPostId(postId);
    setCurrentPlatform(platform);
  };

  const closeModal = () => {
    setCurrentPostId("");
  };

  const submitNewCaption = async () => {
    if (currentPlatform === "facebook") {
      try {
        await fetch(
          `https://graph.facebook.com/v20.0/${currentPostId}?message=${encodeURIComponent(
            newCaption
          )}&access_token=${accessToken}`,
          {
            method: "POST",
          }
        );
        alert("Caption updated successfully.");
        closeModal();
        fetchFacebookFeed();
      } catch (error) {
        console.error("Error updating Facebook caption:", error);
        alert("Failed to update caption.");
      }
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await fetch(
        `https://graph.facebook.com/v20.0/${postId}?access_token=${accessToken}`,
        {
          method: "DELETE",
        }
      );
      alert("Post deleted successfully.");
      fetchFacebookFeed();
    } catch (error) {
      console.error("Error deleting Facebook post:", error);
      alert("Failed to delete post.");
    }
  };

  return (
    <div className="p-4 w-full h-screen overflow-y-scroll">
      <Navbar title="Social Sphere" description=" Social Media Feed" />
      <div className="my-4">
        <select
          id="feedSelector"
          onChange={toggleFeed}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="instagram">Instagram Posts</option>
          <option value="facebook">Facebook Posts</option>
        </select>
      </div>
      <div
        className={`feed flex gap-4 justify-center flex-wrap ${currentPlatform}-feed`}
      >
        {loading ? (
          <div className="spinner">Loading...</div>
        ) : (
          feedData.map((item) => (
            <div
              key={item.id}
              className="feed-item border bg-white border-gray-300 w-[40%] p-4 mb-4 rounded flex flex-col justify-center items-center"
            >
              <div
                onClick={() => window.open(item.permalink, "_blank")}
                className="cursor-pointer"
              >
                <p>{item.message}</p>
                <small>Created at: {item.createdTime}</small>
              </div>
              {currentPlatform === "facebook" && (
                <div className="flex space-x-2">
                  <span
                    className="edit-icon cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(item.id, currentPlatform);
                    }}
                  >
                    ✎
                  </span>
                  <span
                    className="delete-icon cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePost(item.id);
                    }}
                  >
                    🗑️
                  </span>
                </div>
              )}
              {item.media && (
                <img
                  src={item.media}
                  alt="Feed Media"
                  className="mt-2 w-40 h-40 bg-cover"
                />
              )}
            </div>
          ))
        )}
      </div>

      {currentPostId && (
        <div className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded shadow-lg">
            <span className="close cursor-pointer" onClick={closeModal}>
              &times;
            </span>
            <h2 className="text-lg font-semibold">Edit Caption</h2>
            <textarea
              rows={4}
              placeholder="Enter new caption"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              className="border border-gray-300 p-2 w-full mt-2 rounded"
            />
            <button
              onClick={submitNewCaption}
              className="mt-4 bg-blue-500 text-white p-2 rounded"
            >
              Update Caption
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaFeed;
