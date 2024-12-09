// /app/api/payment/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-11-20.acacia",
});

// Calculate the order amount (in cents)
const calculateOrderAmount = (items: any[]) => {
  // Replace this constant with a calculation of the order's amount
  return 700; // Example static amount (e.g., 14.00 EUR)
};

// Handle POST requests to create a payment intent
export async function POST(req: Request) {
  try {
    const { items } = await req.json(); // Parse incoming JSON body

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
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
