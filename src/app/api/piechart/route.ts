import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-11-20.acacia",
});

export async function GET() {
  try {
    // Initialize counters for the different transaction statuses
    let successful = 0;
    let unsuccessful = 0;
    let failed = 0;

    // Fetch recent payment intents (you can adjust the `limit` based on the desired range)
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 100, // Change based on your needs
    });

    // Categorize transactions by status
    paymentIntents.data.forEach((paymentIntent) => {
      if (paymentIntent.status === "succeeded") {
        successful++;
      } else if (paymentIntent.status === "requires_payment_method") {
        unsuccessful++;
      } else {
        failed++;
      }
    });

    // Prepare the data to send back to the frontend
    const transactionData = [
      { status: "Successful", value: successful },
      { status: "Unsuccessful", value: unsuccessful },
      { status: "Failed", value: failed },
    ];

    return NextResponse.json(transactionData); // Send data to frontend
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transaction data" },
      { status: 500 }
    );
  }
}
