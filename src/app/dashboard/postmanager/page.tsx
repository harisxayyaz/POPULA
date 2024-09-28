"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import Card from "@/components/Card";
import MediaPopup from "@/components/MediaPopup";
import PostCard from "@/components/PostCard";
import HorizontalScrollPosts from "@/components/HorizontalScrollPosts";
import Navbar from "@/components/Navbar";

const PostManager = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };  

  const [showPopup, setShowPopup] = useState(false);

  const handlePostCardClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSelectMedia = (media: File) => {
    console.log("Selected media:", media);
    setShowPopup(false);
  };

  return (
    <div className=" max-h-screen w-full overflow-y-scroll  p-4">
      <Navbar title="Social Sphere" description="Post Manager" />

      <div className="mt-6 flex justify-between">
        <Card image="/Like.svg" title="Total Likes" detail="978" />
        <Card image="/comment.svg" title="Total Comments" detail="1435" />
        <Card image="/post.svg" title="Post Count" detail="12" />

        <Card image="/usa.svg" title="Current Balance" detail="$804" />
      </div>

      <div className="h-[50%] flex items-center ">
        <HorizontalScrollPosts />
      </div>

      <div className=" h-[350px] flex justify-between">
        <div className=" h-[95%] pl-4 flex flex-col bg-white w-[74%] rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer ">
          <div className="flex justify-between p-4">
            <h1 className="font-bold text-2xl text-[#2B3674]">
              Sponsored Posts
            </h1>
            <img
              src="/totalleadscard.svg"
              alt=""
              className="w-[40px] h-[40px]"
            />
          </div>
          <div className="flex justify-between pr-5 pl-5 border-b-[1px]  border-[#E9EDF7] text-[#2B3674]">
            <h1 className="w-[18%] ">Adv</h1>
            <h1>Date Posted</h1>
            <h1>Expiry Date</h1>

            <h1>Time Remaining</h1>
          </div>

          <div className="pr-4 pl-4 flex flex-col gap-3 mt-2">
            <div className="flex justify-between">
              <h1 className=" font-bold text-[#2B3674] w-[20%]">
                PO1-Product 1
              </h1>
              <h1 className="pl-5">11 Apr 2024</h1>
              <h1>18 Apr 2024</h1>
              <img src="/adprogress1.svg" alt="" />
            </div>
            <div className="flex justify-between">
              <h1 className=" font-bold text-[#2B3674] w-[20%]">
                PO2-Product 2
              </h1>
              <h1 className="pl-4">09 Jul 2024</h1>
              <h1>16 Jul 2024 </h1>
              <img src="/adprogress2.svg" alt="" />
            </div>
            <div className="flex justify-between">
              <h1 className=" font-bold text-[#2B3674] w-[20%]">
                PO3-Product 3
              </h1>
              <h1 className="pl-5">13 Feb 2024</h1>
              <h1>20 Feb 2024</h1>
              <img src="/adprogress3.svg" alt="" />
            </div>
            <div className="flex justify-between">
              <h1 className=" font-bold text-[#2B3674] w-[20%]">
                PO4-Product 4
              </h1>
              <h1 className="pl-4">03 Jan 2024</h1>
              <h1>10 Jan 2024</h1>
              <img src="/adprogress4.svg" alt="" />
            </div>

            <div className="flex justify-between">
              <h1 className=" font-bold text-[#2B3674] w-[20%]">
                PO4-Product 5
              </h1>
              <h1 className="pl-4">03 Jan 2024</h1>
              <h1>10 Jan 2024</h1>
              <img src="/adprogress3.svg" alt="" />
            </div>

            <div className="flex justify-between">
              <h1 className=" font-bold text-[#2B3674] w-[20%]">
                PO4-Product 6
              </h1>
              <h1 className="pl-4">03 Jan 2024</h1>
              <h1>10 Jan 2024</h1>
              <img src="/adprogress4.svg" alt="" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 font-bold">
          <PostCard
            image="/plusicon.svg"
            title="Create Post"
            onClick={handlePostCardClick}
          />
          <PostCard
            image="/plus.svg"
            title="View All Posts"
            onClick={handlePostCardClick}
          />
          <PostCard
            image="/viewinactive.svg"
            title="Archived Posts"
            onClick={handlePostCardClick}
          />
          {showPopup && <MediaPopup onClose={handleClosePopup} />}
        </div>
      </div>
    </div>
  );
};

export default PostManager;
