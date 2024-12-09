import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-11-20.acacia",
});

export async function GET() {
  try {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(now);
      date.setMonth(now.getMonth() - i);
      return date.toLocaleString("default", { month: "long" });
    }).reverse();

    const monthlyRevenue: Record<string, number> = {};

    for (const month of months) {
      const startDate = new Date(`${month} 1, ${now.getFullYear()}`);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1);

      const paymentIntents = await stripe.paymentIntents.list(
        {
          created: {
            gte: Math.floor(startDate.getTime() / 1000),
            lt: Math.floor(endDate.getTime() / 1000),
          },
        } as Stripe.PaymentIntentListParams
      );

      const totalRevenue = paymentIntents.data.reduce(
        (sum, intent) => sum + intent.amount,
        0
      );

      monthlyRevenue[month] = totalRevenue / 100; // Convert to dollars
    }

    return NextResponse.json({ monthlyRevenue });
  } catch (error) {
    console.error("Error fetching Stripe revenue:", error);
    return NextResponse.json(
      { error: "Failed to fetch revenue data" },
      { status: 500 }
    );
  }
}
