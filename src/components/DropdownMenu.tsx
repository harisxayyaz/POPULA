"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DropdownMenuComponent = () => {
  const [imageUrl, setImageUrl] = useState<string>(""); // State to hold the image URL
  const router = useRouter();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://popula-backend-efc1.onrender.com/api/user/me",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.imageUrl); // Set the image URL state
          console.log("Photo URL fetched successfully");
        } else {
          console.error("Failed to fetch photo:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();
  }, []); // Empty dependency array to run only on mount

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={imageUrl || "/placeholder.png"} // Fallback image if URL is empty
          alt="Profile"
          className="cursor-pointer "
          style={{
            width: "32px",
            height: "32px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          width={40}
          height={40}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push("/dashboard/profilemanagement");
          }}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push("/dashboard/businessconfiguration");
          }}
        >
          Business Profile
        </DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            {
              router.push("/login");
              localStorage.removeItem("token");
            }
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuComponent;
