import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ dpmCheckerLink }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js hasn't yet loaded.
    }

    setIsLoading(true);

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
        className="flex flex-col justify-center items-center  w-full max-w-lg mx-auto  rounded-lg "
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
