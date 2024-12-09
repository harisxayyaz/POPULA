"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import CompletePage from "@/components/CompletePage";
import Image from "next/image";
import DynamicCard from "./_components/PaymentCard";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { setSelectedPlan } from "@/redux/features/business/businessSlice";

import { usePaymentPlans } from "@/hooks/usePaymentPlans";

// Stripe setup
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    "your_default_publishable_key"
);

export default function App() {
  const dispatch = useAppDispatch();
  const { selectedPlan } = useAppSelector((state) => state.business);
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [apiCalled, setApiCalled] = useState(false); // Track if API has been called

  const { plans, loading } = usePaymentPlans();

  useEffect(() => {
    const paymentIntentClientSecret = new URLSearchParams(
      window.location.search
    ).get("payment_intent_client_secret");
    setConfirmed(paymentIntentClientSecret !== null);
  });

  useEffect(() => {
    // Only make the API call if the selectedPlan changes and it's not called yet
    if (selectedPlan && !apiCalled) {
      setApiCalled(true); // Set apiCalled to true to prevent repeated calls

      // Create PaymentIntent as soon as the page loads or the plan changes
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: "xl-tshirt" }],
          selectedPlan, // Send selectedPlan to the server
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
          setDpmCheckerLink(data.dpmCheckerLink);
        });
    }
  }, [selectedPlan, apiCalled]); // Dependency on selectedPlan and apiCalled

  const appearance = {
    theme: "stripe" as "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const handlePlanSelection = (planName: string) => {
    dispatch(setSelectedPlan(planName)); // Update the selected plan
  };

  return (
    <div className="flex justify-center bg-[#f4f7fe] h-screen">
      <section className="flex flex-col gap-4 justify-center items-center">
        {selectedPlan}
        {plans.map((plan) => (
          <DynamicCard
            key={plan.id}
            description={plan.description}
            imagePath={plan.imagePath}
            listItems={plan.listItems}
            onClick={() => handlePlanSelection(plan.name)}
          />
        ))}
      </section>
      <section className="flex flex-col gap-4 justify-center w-[500px] items-center">
        <Image
          src="/payment/colab.svg"
          alt="payment-illustration"
          width={500}
          height={500}
          className="w-56"
        />
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            {confirmed ? (
              <CompletePage />
            ) : (
              <CheckoutForm dpmCheckerLink={dpmCheckerLink} />
            )}
          </Elements>
        )}
      </section>
    </div>
  );
}
