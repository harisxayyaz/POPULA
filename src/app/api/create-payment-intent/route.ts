// /app/api/payment/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-11-20.acacia",
});

// Calculate the order amount (in cents)
const calculateOrderAmount = (items: any[]) => {
  return 70000; // Example static amount (e.g., 70000 cents)
};

// Handle POST requests to create a payment intent
export async function POST(req: Request) {
  try {
    const { items, selectedPlan } = await req.json(); // Extract selectedPlan and items from the request body
    console.log("Selected Plan:", selectedPlan); // Print selectedPlan to verify it's received
    
    let amount = 0;
    if (selectedPlan === "basic") {
      amount = 10000;
    } else if (selectedPlan === "business") {
      amount = 20000;
    } else {
      amount = 50000;
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return the client secret for the client-side to complete the payment
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });
  } catch (error) {
    // Handle errors (like network or Stripe-related issues)
    return NextResponse.json(
      { error: "Failed to create payment intent." },
      { status: 500 }
    );
  }
}
