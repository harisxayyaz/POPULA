"use client";

import LandingButton from "./components/LandingButton";
import LandingCard from "./components/LandingCard";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const clickSignup = () => {
    router.push("./signup");
  };

  const clickLogin = () => {
    router.push("./login");
  };

  return (
    <main>
      <div className="flex justify-between bg-[#270139] text-gray-300 h-[40px] items-center pl-10 pr-10">
        <h1>populafyp@gmail.com</h1>
        <h1>+923171100332 | +923365271144</h1>
      </div>
      <div
        style={{
          backgroundImage: "url('./Landing.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-screen"
      >
        <div className="flex justify-between pl-10 pr-10 pt-6">
          <div>
            <img src="logowhite.svg" alt="" />
          </div>
          <div className="flex w-[40%] justify-between items-center">
            <LandingButton text="Services" color="white" font="black" />
            <LandingButton text="Pricing" color="white" font="black" />
            <LandingButton text="About Us" color="white" font="black" />
            <LandingButton text="Contact Us" color="white" font="black" />
          </div>

          <div className="flex w-[20%] items-center justify-between">
            <div className=" cursor-pointer" onClick={clickLogin}>
              <LandingButton text="Login" color="white" font="black" />
            </div>
            <div onClick={clickSignup} className=" cursor-pointer ">
              <LandingButton text="Signup" color="black" font="white" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen">
        <div className="flex flex-col justify-center items-center gap-4 mb-24">
          <h1 className="text-4xl font-bold text text-[#270139]">Services</h1>

          <p className=" text-center">
            POPULA makes lead generation, social media posts, and analytics easy
            and smart. <br /> Boost your marketing and grow your business with
            ease.
          </p>

          <div className="flex gap-10 items-center justify-center mt-6">
            <LandingCard
              url="leadmanagement.svg"
              title="Lead Management"
              description="Easily capture and manage leads with easy form creation"
            />
            <LandingCard
              url="centralized.svg"
              title="Centralized Posting"
              description="Post across all platforms in one click from one place for maximum outreach and engagement."
            />
            <LandingCard
              url="realtimeanalysis.svg"
              title="Real-time Analysis"
              description="Gain data insights for smarter decisions and business growth"
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 mt-6 mb-6 h-[400px]">
          <div className="w-[30%] ]">
            <h1 className="text-4xl font-bold text text-[#270139] mb-10">
              Lead Management
            </h1>
            <p className=" text-justify">
              Effortlessly capture, organize, and nurture leads with our
              intuitive platform, empowering your business to thrive through
              lead management and effective conversion strategies.
            </p>
          </div>
          <div>
            <img src="graph001.svg" alt="" className="h-[60%] w-[450px]" />
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6 mb-6 h-[400px]">
          <div>
            <img src="graph002.svg" alt="" className="h-[60%] w-[450px]" />
          </div>
          <div className="w-[30%] ]">
            <h1 className="text-4xl font-bold text text-[#270139] mb-10">
              Centralized Posting
            </h1>
            <p className=" text-justify">
              Simplify your social media strategy with our centralized posting
              feature, allowing you to schedule and publish content across
              multiple platforms from a single, user-friendly dashboard, saving
              you time with pre-built templates and maximizing your online
              presence.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6 mb-6 h-[400px]">
          <div className="w-[30%] ]">
            <h1 className="text-4xl font-bold text text-[#270139] mb-10">
              Real-Time Analytics
            </h1>
            <p className=" text-justify">
              Gain valuable insights into your business with real-time
              analytics, tracking leads, employee performance, social media
              engagement, and website metrics, empowering you to make
              data-driven decisions for optimal growth and success.
            </p>
          </div>
          <div>
            <img src="graph003.svg" alt="" className="h-[60%] w-[450px]" />
          </div>
        </div>

        <div
          className="flex flex-col justify-center items-center gap-4 mt-6 pt-[500px]"
          style={{
            backgroundImage: "url('./background-bottom.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-4xl font-bold text text-[#270139]">
            Pricing Plans
          </h1>
          <p className="text-center">
            Unlock the full potential of your business with our flexible and
            affordable pricing plans tailored to meet your specific needs and
            <br /> budget, ensuring you get the most value out of our
            comprehensive suite of features and services.
          </p>
          <div className="flex gap-6 items-center justify-center mt-6">
            <img
              src="pricing01.svg"
              alt=""
              className=" cursor-pointer hover:translate-y-[-4px] transition-transform hover:scale-110 "
            />
            <img
              src="pricing02.svg"
              alt=""
              className=" cursor-pointer hover:translate-y-[-4px] transition-transform hover:scale-110 "
            />
            <img
              src="pricing03.svg"
              alt=""
              className=" cursor-pointer hover:translate-y-[-4px] transition-transform hover:scale-110 "
            />
          </div>
        </div>
      </div>
    </main>
  );
}
