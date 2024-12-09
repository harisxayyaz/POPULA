import Stripe from "stripe";
import { buffer } from "micro";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-11-20.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

// Setup CORS to allow POST and HEAD methods
const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

// Webhook handler function
const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // Get the raw body from the request
      const buf = await buffer(req);
      const signature = req.headers["stripe-signature"] as string;

      // Construct the Stripe event from the raw body and signature
      let event: Stripe.Event;
      try {
        event = stripe.webhooks.constructEvent(
          buf.toString(),
          signature,
          webhookSecret
        );
      } catch (err: any) {
        // On error, log and return the error message
        console.log(`❌ Error message: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      // Successfully constructed event.
      console.log("✅ Success:", event.id);

      // Handle different event types
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

      // Return a response to acknowledge receipt of the event
      res.json({ received: true });
    } catch (err) {
      console.error("Error handling webhook:", err);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
