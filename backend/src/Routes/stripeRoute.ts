import { Router } from "express";
import { createPayment } from "../controllers/razorpayController";
import { handleStripeWebhook } from "../controllers/webhookController";
const router = Router();
router.post("/create-payment", createPayment);
router.post("/webhook", handleStripeWebhook);
export default router;
