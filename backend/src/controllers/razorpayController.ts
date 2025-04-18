import stripe from "../utils/Stripe";
import { Request, Response } from "express";
import crypto from "crypto";

export const createPayment = async (req: Request, res: Response) => {
    try {
      const { amount } = req.body;
      const bookingId = crypto.randomBytes(8).toString("hex");
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "inr",
        metadata: {
          bookingId, // ✅ Attach to Stripe metadata
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });
       res.status(200).json({
         clientSecret: paymentIntent.client_secret,
         bookingId,
       });
      return;
    } catch (error:any) {
       console.error("❌ Stripe Error:", error.message);
         res
          .status(500)
          .json({ error: "Failed to create Payment Intent" });
          return;
    }
};