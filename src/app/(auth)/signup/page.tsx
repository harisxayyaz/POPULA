"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Unna } from "next/font/google";

const unna = Unna({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [acceptMarketing, setAcceptMarketing] = useState<boolean>(false);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }


    if (!agreeToTerms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        setError("");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <main className="flex flex-col md:flex-row w-screen h-screen">
      <section className="md:w-[60%] md:h-full p-6 flex flex-col order-1 md:order-2">
        <div className="flex justify-end mb-6 pr-6">
          <p className="text-blue-500 cursor-pointer md:text-sm hover:text-blue-800 ">
            <Link href="/login">Already have an account? Sign in</Link>
          </p>
        </div>
        <div className="flex flex-col justify-center md:h-full h-[80vh] ">
          <div className="flex justify-center mb-6">
            <form className="space-y-6 w-full max-w-md" onSubmit={handleSubmit}>
              <img
                src="/logo.svg"
                alt="logo"
                className="h-12 block md:hidden"
              />
              <div className={`${unna.className} `}>
                <h1 className=" text-4xl font-bold">
                  Create Your Free Account And Get Started!
                </h1>
              </div>
              {/* Email input */}
              <div className="relative">
                <input
                  type="email"
                  required
                  className="w-full h-10 text-md px-2 text-black bg-transparent border border-purple rounded-md outline-none peer"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="absolute top-1/2 left-1 text-sm text-black px-2 pointer-events-none transform -translate-y-1/2 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:bg-white peer-valid:top-0 peer-valid:text-sm peer-valid:bg-white">
                  Email
                </label>
              </div>
              {/* Password input */}
              <div className="relative">
                <input
                  type="password"
                  required
                  className="w-full h-10 text-md px-2 text-black bg-transparent border border-purple rounded-md outline-none peer"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="absolute top-1/2 left-1 text-sm text-black px-2 pointer-events-none transform -translate-y-1/2 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:bg-white peer-valid:top-0 peer-valid:text-sm peer-valid:bg-white">
                  Password
                </label>
              </div>
              {/* Confirm Password input */}
              <div className="relative">
                <input
                  type="password"
                  required
                  className="w-full h-10 text-md px-2 text-black bg-transparent border border-purple rounded-md outline-none peer"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label className="absolute top-1/2 left-1 text-sm text-black px-2 pointer-events-none transform -translate-y-1/2 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:bg-white peer-valid:top-0 peer-valid:text-sm peer-valid:bg-white">
                  Confirm Password
                </label>
              </div>
              {/* Checkboxes for marketing emails and terms */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="acceptMarketing"
                  checked={acceptMarketing}
                  onChange={() => setAcceptMarketing(!acceptMarketing)}
                  className="mr-2"
                />
                <label htmlFor="acceptMarketing" className="text-sm text-black">
                  Accept Marketing Emails
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                  className="mr-2"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-black">
                  Agree to Terms and Conditions
                </label>
              </div>
              {/* Submit button */}
              <div className="relative">
                <button
                  className="w-full h-10 bg-red-500 text-white rounded-md hover:bg-red-700 "
                  type="submit"
                >
                  Sign Up for free
                </button>
              </div>
              {/* Display error/success messages */}
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
            </form>
          </div>
          <div className="flex items-center justify-center cursor-pointer">
            <h1 className="text-center text-sm mr-1">or sign in using</h1>
            <img src="/google.svg" alt="google" className="h-5 w-5" />
          </div>
        </div>
      </section>
      <section
        className="flex flex-col gap-3 justify-center items-center md:h-full md:w-[40%] bg-[#270139] text-center md:text-left py-8 px-24 bg-cover bg-center order-2 md:order-1"
        style={{ backgroundImage: "url('/design.svg')" }}
      >
        <img
          src="/whiteLogo.svg"
          alt="white logo"
          className="h-12 md:block hidden"
        />

        <img src="/user.png" alt="user photo" className="h-24 w-24" />
        <p className="text-white text-center">
          “POPULA provided exceptional service, exceeding my expectations and
          leaving me extremely satisfied.”
        </p>
        <p className="text-[#31A1A1] text-center tracking-widest ">
          ANTON VILLE | CEO, ADC PHARM.
        </p>
      </section>
    </main>
  );
};

export default Signup;
