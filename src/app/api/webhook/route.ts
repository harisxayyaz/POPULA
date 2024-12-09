import Stripe from "stripe";
import { buffer } from "micro";
import Cors from "micro-cors";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-11-20.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

// Stripe requires the raw body to construct the event.
export const config = {
  runtime: "edge",
};

// Setup CORS
const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

// Webhook handler
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text(); // Use `text()` to read the raw body
    const signature = req.headers.get("stripe-signature") || "";

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err: any) {
      console.error(`❌ Error message: ${err.message}`);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    console.log("✅ Success:", event.id);

    // Handle the event types
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent status: ${paymentIntent.status}`);
        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(
          `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
        );
        break;
      }
      case "charge.succeeded": {
        const charge = event.data.object as Stripe.Charge;
        console.log(`Charge id: ${charge.id}`);
        break;
      }
      default: {
        console.warn(`Unhandled event type: ${event.type}`);
        break;
      }
    }

    // Acknowledge receipt of the event
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Error handling webhook:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, stripe-signature",
    },
  });
}
