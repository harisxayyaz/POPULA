"use client";
import React, { useState, FormEvent } from "react";

const ForgotPassword: React.FC = () => {
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
        setMessage("Check your email for the password reset link."); // Success message
        setError(null); // Clear any previous errors
        setFormSubmitted(true); // Mark the form as submitted to hide it
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
    <main
      className="flex flex-col w-screen h-screen justify-center items-center"
      style={{
        backgroundImage: "url('./background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-1/3 h-[30%] flex flex-col rounded-2xl bg-[#56007E] opacity-80 drop-shadow-2xl p-7 items-center justify-center">
        <h1 className="text-white text-2xl font-extrabold">Forgot Password</h1>

        {/* Conditionally render the form or the success message */}
        {!formSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 mt-4 items-center"
          >
            <label htmlFor="email">
              <input
                type="email"
                placeholder="Enter your email: "
                className="h-[35px] pl-4 rounded"
                value={email} // Bind the input value to state
                onChange={(e) => setEmail(e.target.value)} // Update the state when input changes
                required // Ensure email is required
              />
            </label>

            <button
              type="submit"
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#003465] hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? (
                <div className="loader border-t-4 border-white rounded-full w-5 h-5 animate-spin"></div> // Loader (spinner)
              ) : (
                "Enter"
              )}
            </button>
          </form>
        ) : (
          <div className="text-white text-lg mt-4">
            {message && <p>{message}</p>}
          </div>
        )}

        {/* Display error message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </main>
  );
};

export default ForgotPassword;
