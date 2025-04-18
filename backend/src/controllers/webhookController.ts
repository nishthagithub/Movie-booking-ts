// controllers/webhookController.ts
import { Request, Response } from "express";
import stripe from "../utils/Stripe";
import { buffer } from "micro"; 
import dotenv from "dotenv";

dotenv.config();

const endpointSecret = process.env.STRIPE_SECRET!;

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"]!;

  let event;

  try {
    // Use raw body
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
     res.status(400).send(`Webhook Error: ${err.message}`);
     return;
  }

  // Handle successful payment
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
const bookingId = paymentIntent.metadata?.bookingId;
console.log(bookingId) 
}

  res.status(200).send("Webhook received");
};
