"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
        `http://localhost:5000/api/user/reset-password/${params.token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
    <div className="bg-custom-purple h-screen w-screen flex flex-col justify-center items-center">
      <div className="w-[25%] h-[40%] bg-white rounded">
        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <h1>New Password</h1>
          <input
            type="password"
            placeholder="new password"
            className="w-full h-10 border-gray border-2 pl-4"
            value={password} // Bind new password state
            onChange={(e) => setNewPassword(e.target.value)} // Update state on change
            required // Ensure input is required
          />
          <h1>Confirm New Password</h1>
          <input
            type="password"
            placeholder="confirm new password"
            className="w-full h-10 border-gray border-2 pl-4"
            value={confirmPassword} // Bind confirm password state
            onChange={(e) => setConfirmPassword(e.target.value)} // Update state on change
            required // Ensure input is required
          />
          <button
            type="submit"
            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-custom-purple hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? "Submitting..." : "Enter"}{" "}
            {/* Change button text */}
          </button>
        </form>

        {/* Display success or error messages */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {message && <p className="text-green-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
