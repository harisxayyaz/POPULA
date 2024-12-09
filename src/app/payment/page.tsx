"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import CompletePage from "@/components/CompletePage";
import Image from "next/image";
import DynamicCard from "./_components/PaymentCard";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    "your_default_publishable_key"
);

const cardData = {
  description: "Ideal for startups or small businesses exploring the platform.",
  imagePath: "/payment/basic.svg",
  listItems: [
    "Create and manage up to 50 leads per month.",
    "Generate up to 3 AI-powered posts.",
    "1 post per day.",
    "Limited access to basic analytics.",
    "Community support only.",
  ],
};

const cardData2 = {
  description:
    "Perfect for growing businesses seeking better engagement and insights.",
  imagePath: "/payment/business.svg",
  listItems: [
    " 1000 leads per month lead management.",
    "Generate up to 50 AI-powered posts per month.",
    "Unlimited Post Scheduling",
    "Access to detailed business analytics",
    "Schedule posts and advertisements.",
    "Priority customer support (email).",
  ],
};

const cardData3 = {
  description:
    "Ideal for established businesses looking to scale their social media presence.",
  imagePath: "/payment/businessplus.svg",
  listItems: [
    "Unlimited leads per month.",
    "Unlimited AI-powered posts.",
    "Unlimited post scheduling.",
    "Access to advanced analytics.",
    "Schedule posts and advertisements.",
    "Priority customer support (email and phone).",
  ],
};

export default function App() {
  const [clientSecret, setClientSecret] = React.useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);

  React.useEffect(() => {
    const paymentIntentClientSecret = new URLSearchParams(
      window.location.search
    ).get("payment_intent_client_secret");
    setConfirmed(paymentIntentClientSecret !== null);
  });

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        // [DEV] For demo purposes only
        setDpmCheckerLink(data.dpmCheckerLink);
      });
  }, []);

  const appearance = {
    theme: "stripe" as "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="flex justify-center bg-[#f4f7fe] h-screen">
      <section className=" flex flex-col gap-4 justify-center items-center">
        <DynamicCard
          description={cardData.description}
          imagePath={cardData.imagePath}
          listItems={cardData.listItems}
        />

        <DynamicCard
          description={cardData2.description}
          imagePath={cardData2.imagePath}
          listItems={cardData2.listItems}
        />

        <DynamicCard
          description={cardData3.description}
          imagePath={cardData3.imagePath}
          listItems={cardData3.listItems}
        />
      </section>
      <section className="flex flex-col gap-4 justify-center w-[500px] items-center ">
        <Image
          src="/payment/colab.svg"
          alt="payment-illustration"
          width={500}
          height={500}
          className=" w-56"
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
