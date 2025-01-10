import React, { useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAppSelector } from "@/redux/store/hooks";

export default function CheckoutForm({ dpmCheckerLink }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://popula-backend-efc1.onrender.com/api/business/my-business",
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
          setFormData(data); // Set the business data into formData state
          console.log("Business data fetched successfully:", data);
        } else {
          console.error("Failed to fetch business data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching business data:", error);
      }
    };
    fetchBusiness();
  }, []); // Empty dependency array to fetch only on mount

  const { selectedPlan } = useAppSelector((state) => state.business);
  const token = localStorage.getItem("token");

  const updateBusinessSubscription = async () => {
    if (!formData) return; // Ensure formData is available

    const businessId = formData._id; // Extract businessId from formData

    console.log("Updating business subscription");

    try {
      const response = await fetch(
        `https://popula-backend-efc1.onrender.com/api/business/${businessId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            subscription: selectedPlan, // Send the selectedPlan to update the subscription
          }),
        }
      );

      if (response.ok) {
        console.log("Business subscription updated successfully");
      } else {
        console.error("Error updating subscription");
      }
    } catch (error) {
      console.error("Failed to update business subscription", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js hasn't yet loaded.
    }

    setIsLoading(true);
    updateBusinessSubscription(); // Call to update subscription
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/dashboard",
      },
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <>
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-full max-w-lg mx-auto rounded-lg"
      >
        <PaymentElement
          id="payment-element"
          options={paymentElementOptions}
          className="mb-6 w-full"
        />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="bg-blue-600 text-white font-semibold text-lg py-3 px-4 rounded-lg w-full hover:contrast-125 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all duration-200"
        >
          <span id="button-text">
            {isLoading ? <div className="spinner"></div> : "Pay now"}
          </span>
        </button>
        {message && (
          <div
            id="payment-message"
            className="text-gray-500 text-lg pt-3 text-center"
          >
            {message}
          </div>
        )}
      </form>
    </>
  );
}
