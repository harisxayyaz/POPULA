import React from "react";
import Image from "next/image";

type PostCardProps = {
  caption: string;
  mediaUrl: string | null;
};

const PostCard = ({ caption, mediaUrl }: PostCardProps) => {
  return (
    <div className="max-w-lg  bg-white shadow-lg rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Image
          src="/createpost/pfp.svg" // Replace with your profile image path
          width={40}
          height={40}
          alt="Profile"
          className="rounded-full"
        />
        <div>
          <h4 className="font-semibold text-sm">John Doe</h4>
          <span className="text-xs text-gray-500">December 8, 2024</span>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-3 text-sm text-gray-800">
        {caption || "This is a default caption. Add your text here."}
      </div>

      {/* Post Image */}
      <div className="mt-3">
        <Image
          src={mediaUrl || "/postPlaceholder.png"} // Default to placeholder if no media URL
          width={400}
          height={200}
          alt="Post Image"
          className="rounded-lg object-cover"
        />
      </div>

      {/* Actions */}
      <div className="mt-4 flex justify-around border-t pt-3">
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
          <Image
            src="/createpost/comment.svg" // Replace with your like icon path
            width={20}
            height={20}
            alt="Like"
          />
          <span className="text-sm">Like</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
          <Image
            src="/createpost/share.svg" // Replace with your comment icon path
            width={20}
            height={20}
            alt="Comment"
          />
          <span className="text-sm">Comment</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
          <Image
            src="/createpost/like.svg" // Replace with your share icon path
            width={20}
            height={20}
            alt="Share"
          />
          <span className="text-sm">Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
