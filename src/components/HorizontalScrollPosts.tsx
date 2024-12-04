import { log } from "console";
import React, { useRef, useEffect, useState } from "react";

type Post = {
  id: string;
  message?: string;
  story?: string;
  created_time: string;
  attachments?: {
    data: {
      media: {
        image: {
          src: string;
        };
      };
    }[];
  };
};

const HorizontalScrollPosts: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<Post[]>([]); // State for storing posts

  useEffect(() => {
    // Fetch posts from the API when the component mounts
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://graph.facebook.com/v20.0/370027042861373/feed?fields=message,story,created_time,attachments{media},id&access_token=EAB1XqldtBCQBO6dlX2TJEr8hfUTuVqlL2BhmIKp0P2jnsODeWPs5Wmegrw3XjwwTDzdqNcct0jEqldcXwKO0xQSmZCEjbbQ7kvSNpEiOL6illb9iDTiGJAhTWYaMMCadZAZBZCCuXdAr5aEr4RijqI003XHTtk6TGavKbeQHotbgprnweluB2CPTMxZBPEdkqtEvfLXnZCExRnwmOHSSYWECghIAZDZD"
        );
        const data = await response.json();
        setPosts(data.data); // Update state with the fetched posts
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Scroll logic to scroll continuously
  useEffect(() => {
    const scrollElement = scrollRef.current;
    let scrollInterval: NodeJS.Timeout;

    const handleScroll = () => {
      if (scrollElement) {
        const maxScrollLeft =
          scrollElement.scrollWidth - scrollElement.clientWidth;

        // Scroll by a small amount
        scrollElement.scrollBy({
          left: 2, // Adjust speed of scroll
          behavior: "smooth",
        });

        // If we reach the end, reset the scroll back to the beginning
        if (scrollElement.scrollLeft >= maxScrollLeft) {
          scrollElement.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    };

    // Set interval for continuous scrolling
    scrollInterval = setInterval(handleScroll, 200); // Adjust interval time for smoothness

    return () => clearInterval(scrollInterval);
  }, []);

  // Function to display posts (similar to the displayFeed function)
  function displayFeed(posts: Post[], platform: string) {
    return posts.map((post) => (
      <div
        key={post.id}
        className="feed-item w-[30%] flex-shrink-0 transition-transform transform hover:scale-110 cursor-pointer"
        onClick={() =>
          window.open(
            platform === "facebook"
              ? `https://www.facebook.com/${post.id}`
              : "#",
            "_blank"
          )
        }
      >
        {/* Display image if available */}
        {post.attachments?.data[0]?.media?.image?.src && (
          <div className="bg-white p-4 rounded-xl">
            <p className=" text-center">
              Created Time: <br />
              {post.created_time}
            </p>
            <img
              src={post.attachments.data[0].media.image.src}
              alt={post.message || "Post Image"}
              className="w-full h-48 bg-cover"
            />
          </div>
        )}
      </div>
    ));
  }

  return (
    <div
      ref={scrollRef}
      className="overflow-hidden p-10  whitespace-nowrap w-full"
    >
      <div className="flex scroll-animation gap-6 p-10">
        {/* Display fetched posts */}
        {displayFeed(posts, "facebook")}
      </div>
    </div>
  );
};

export default HorizontalScrollPosts;
