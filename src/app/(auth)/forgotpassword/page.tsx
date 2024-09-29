"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { Unna } from "next/font/google";

const unna = Unna({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ForgotPassword: React.FC = () => {
  const router = useRouter(); // Use router for navigation
  const [email, setEmail] = useState<string>(""); // State to capture email input
  const [message, setMessage] = useState<string>(""); // State to display success message
  const [error, setError] = useState<string | null>(null); // State to display errors
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to show loading spinner
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false); // State to hide form after submission

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Start loading

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMessage("A password reset link has been sent to your email! Check your inbox"); // Success message
        setError(null); // Clear any previous errors
        setFormSubmitted(true); // Mark the form as submitted to hide it
        setEmail(""); // Clear the email input field
      } else {
        setError(data.message); // Show error message from server
        setMessage(""); // Clear success message
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setMessage("");
    } finally {
      setIsLoading(false); // Stop loading after completion
    }
  };

  return (
    <main className="flex flex-col md:flex-row w-screen h-screen">
      <section className="w-full md:h-full p-6 flex flex-col order-1 md:order-2">
        <div className="flex flex-col justify-center md:h-full h-[80vh]">
          <div className="flex justify-center mb-6">
            {!formSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 w-full max-w-md"
              >
                <img
                  src="/logo.svg"
                  alt="logo"
                  className="h-12 block md:hidden"
                />
                <div className={`${unna.className}`}>
                  <h1 className="text-4xl font-bold">Reset Your Password</h1>
                </div>
                {/* Email input */}
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-10 text-md px-2 text-black bg-transparent border border-purple rounded-md outline-none peer"
                    value={email} // Bind the input value to state
                    onChange={(e) => setEmail(e.target.value)} // Update the state when input changes
                    required // Ensure email is required
                  />
                </div>
                {/* Submit button */}
                <div className="relative">
                  <button
                    type="submit"
                    className="w-full h-10 bg-red-500 text-white rounded-md hover:bg-red-700"
                    disabled={isLoading} // Disable button when loading
                  >
                    {isLoading ? (
                      <div className="loader border-t-4 border-white rounded-full w-5 h-5 animate-spin"></div> // Loader (spinner)
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </div>
                {/* Display error/success messages */}
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}
              </form>
            ) : (
              <div className="text-black text-lg mt-4">
                <p>{message}</p>{" "}
                {/* Display success message after submission */}
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <p className="text-blue-500 cursor-pointer md:text-sm hover:text-blue-800">
              <Link href="/login">Password yaad aa gaya? Sign in!</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;
