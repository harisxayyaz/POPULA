"use client";
import React from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import Card from "@/components/Card";
import PostCard from "@/components/PostCard";
import HorizontalScrollPosts from "@/components/HorizontalScrollPosts";
import Navbar from "@/components/Navbar";
import PostModal from "./_components/PostModal";
import Image from "next/image";
import Link from "next/link";

const PostManager = () => {

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
  // const token = 

  //  try {
  //         const response = await fetch(
  //           `https://graph.facebook.com/v20.0/${pageId}/feed?fields=message,story,created_time,attachments{media},id&access_token=${accessToken}`
  //         );
  //         const data = await response.json();
  //         displayFeed(data, "facebook");
  //       } catch (error) {
  //         console.error("Error fetching Facebook feed:", error);
  //       } finally {
  //         document.getElementById("spinner").style.display = "none";
  //       }
  //     }

  return (
    <div className=" max-h-screen w-full overflow-y-scroll  p-4">
      <Navbar title="Social Sphere" description="Post Manager" />

      <div className="mt-6 flex justify-between">
        <Card image="/Like.svg" title="Total Likes" detail="12" />
        <Card image="/comment.svg" title="Total Comments" detail="1" />
        <Card image="/post.svg" title="Post Count" detail="12" />
        <Card image="/usa.svg" title="Current Balance" detail="$0" />
      </div>

      <div className="h-[45%] flex items-center ">
        <HorizontalScrollPosts />
      </div>

      <div className=" h-[350px] flex flex-col gap-4">
        <div className="flex justify-evenly gap-4 w-full font-bold px-28 ">
          {/* <PostModal /> */}
          <button onClick={()=>{window.location.href = "/dashboard/postmanager/create-post"}} className="flex bg-white items-center justify-center w-[248px] h-[100px] rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer gap-4">
            <Image src="/plusicon.svg" width={50} height={50} alt="eye" />
            Create Post
          </button>
          <Link
            href={"/dashboard/postmanager/allposts"}
            className="flex bg-white items-center justify-center w-[248px] h-[100px] rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer gap-4"
          >
            <Image src="/plus.svg" width={50} height={50} alt="eye" />
            View All Posts
          </Link>
          <Link
            href={"/dashboard/postmanager/allposts"}
            className="flex bg-white items-center justify-center w-[248px] h-[100px] rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer gap-4"
          >
            <Image src="/plus.svg" width={50} height={50} alt="eye" />
            View Insights
          </Link>
        </div>

        <div className=" h-[95%] pl-4 flex flex-col bg-white w-full rounded-xl drop-shadow-md hover:drop-shadow-lg hover:translate-y-[-4px] transition-transform cursor-pointer ">
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
      </div>
    </div>
  );
};

export default PostManager;
