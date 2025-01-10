"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Unna } from "next/font/google"; // Import font if needed

const unna = Unna({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ResetPassword = ({ params }: { params: { token: string } }) => {
  const router = useRouter();
  const [password, setNewPassword] = useState(""); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming password
  const [error, setError] = useState(""); // State for error messages
  const [message, setMessage] = useState(""); // State for success messages
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submitting status

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true); // Set submitting state to true

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false); // Reset submitting state
      return;
    }

    try {
      const response = await fetch(
        `http://popula-backend-efc1.onrender.com/api/user/reset-password/${params.token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${params.token}`,
          },
          body: JSON.stringify({ password }), // Send new password
        }
      );

      const data = await response.json(); // Parse JSON response

      if (response.ok) {
        setMessage(data.message); // Display success message
        setTimeout(() => {
          router.push("/login");
        }, 1000);
        setError(""); // Clear error message
      } else {
        setError(data.message); // Display error message
      }
    } catch (error) {
      setError("An error occurred. Please try again."); // Handle errors
    } finally {
      setIsSubmitting(false); // Reset submitting state after request
    }
  };

  return (
    <main className="flex flex-col w-screen h-screen">
      <section className="w-full h-full p-6 flex flex-col justify-center items-center">
        <div className="w-full max-w-md h-auto bg-white rounded-md shadow-md p-6 flex flex-col">
          <div className={`${unna.className} text-center mb-6`}>
            <h1 className="text-4xl font-bold">New Password</h1>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* New Password Input */}
            <div className="relative">
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full h-10 text-md px-2 text-black bg-transparent border border-purple rounded-md outline-none peer"
                value={password} // Bind new password state
                onChange={(e) => setNewPassword(e.target.value)} // Update state on change
                required // Ensure input is required
              />
            </div>
            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full h-10 text-md px-2 text-black bg-transparent border border-purple rounded-md outline-none peer"
                value={confirmPassword} // Bind confirm password state
                onChange={(e) => setConfirmPassword(e.target.value)} // Update state on change
                required // Ensure input is required
              />
            </div>
            {/* Submit Button */}
            <div className="relative">
              <button
                type="submit"
                className="w-full h-10 bg-red-500 text-white rounded-md hover:bg-red-700"
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? "Submitting..." : "Enter"}
                {/* Change button text */}
              </button>
            </div>
          </form>

          {/* Display success or error messages */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {message && <p className="text-green-500 mt-4">{message}</p>}
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
