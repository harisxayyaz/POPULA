"use client"
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useState } from "react";
import SocialMediaCard from "./_components/SocialMediaCard";

type Props = {};

const SocialMedia = (props: Props) => {
  const [isFacebookToggled, setIsFacebookToggled] = useState(true);
  const [isInstagramToggled, setIsInstagramToggled] = useState(true);
  const [isTiktokToggled, setIsTiktokToggled] = useState(false);
  const [isXToggled, setIsXToggled] = useState(false);
  return (
    <div className="p-6 max-h-screen space-y-4 w-full overflow-y-scroll">
      <Navbar title="Admin" description={"Social Media"} />
      <div className="flex flex-col gap-6 w-full justify-center items-center">
        <div className=" bg-cover">
          <Image
            src="/admin/socialmediabanner.png"
            width={982}
            height={178}
            alt="Banner"
          />
        </div>
        <div className="flex justify-center gap-6 flex-wrap">
          <SocialMediaCard
            imagePath="/admin/facebook.png"
            title="Facebook"
            version="1.0"
            isToggled={isFacebookToggled}
            onToggle={() => setIsFacebookToggled((prev) => !prev)}
          />
          <SocialMediaCard
            imagePath="/admin/instagram.png"
            title="Instagram"
            version="2.0.1"
            isToggled={isInstagramToggled}
            onToggle={() => setIsInstagramToggled((prev) => !prev)}
          />
          <SocialMediaCard
            imagePath="/admin/twitter.png"
            title="Twitter "
            version="2.0.1"
            isToggled={isXToggled}
            onToggle={() => setIsXToggled((prev) => !prev)}
          />
          <SocialMediaCard
            imagePath="/admin/tiktok.png"
            title="Tiktok "
            version="2.0.1"
            isToggled={isTiktokToggled}
            onToggle={() => setIsTiktokToggled((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
