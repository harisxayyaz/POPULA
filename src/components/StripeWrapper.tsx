"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QTmtdKzdi8KhZW89ddj171mwTNBAanTrOJLC8qfuGlXMJL36H3mnWU7TcyyvUXPmmiV6Cx2muDs9s0FWtUiwxn800qcukQL6S"
);

const StripeWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => <Elements stripe={stripePromise}>{children}</Elements>;

export default StripeWrapper;
