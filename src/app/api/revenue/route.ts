import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-11-20.acacia",
});

// GET method handler
export async function GET() {
  try {
    // Fetch successful payments
    let totalRevenue = 0;
    let lastPaymentId: string | null = null;
    let hasMorePayments = true;

    while (hasMorePayments) {
      const paymentIntents: Stripe.ApiList<Stripe.PaymentIntent> = await stripe.paymentIntents.list({
        limit: 100,
        starting_after: lastPaymentId || undefined,
      });

      const successfulPayments = paymentIntents.data.filter(
        (payment) => payment.status === "succeeded"
      );

      totalRevenue += successfulPayments.reduce(
        (sum, payment) => sum + payment.amount,
        0
      );

      hasMorePayments = paymentIntents.has_more;
      if (hasMorePayments) {
        lastPaymentId = paymentIntents.data[paymentIntents.data.length - 1].id;
      }
    }

    // Fetch refunds
    let totalRefunds = 0;
    let lastRefundId: string | null = null;
    let hasMoreRefunds = true;

    while (hasMoreRefunds) {
      const refunds: Stripe.ApiList<Stripe.Refund> = await stripe.refunds.list({
        limit: 100,
        starting_after: lastRefundId || undefined,
      });

      totalRefunds += refunds.data.reduce(
        (sum, refund) => sum + refund.amount,
        0
      );

      hasMoreRefunds = refunds.has_more;
      if (hasMoreRefunds) {
        lastRefundId = refunds.data[refunds.data.length - 1].id;
      }
    }

    const netRevenue = totalRevenue - totalRefunds;

    return NextResponse.json({ netRevenue: netRevenue / 100 }); // Convert to currency
  } catch (error) {
    console.error("Error fetching revenue:", error);
    return NextResponse.json(
      { error: "Failed to fetch revenue data" },
      { status: 500 }
    );
  }
}
