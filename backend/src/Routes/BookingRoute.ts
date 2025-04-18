import { Router } from "express";
import {
  createBookingWithPayment,
  getUserBookings,
} from "../controllers/BookingControlller";
const router = Router();
router.post("/pay", createBookingWithPayment);
router.get("/:userId", getUserBookings);

export default router;
