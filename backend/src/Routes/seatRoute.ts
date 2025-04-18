import { Router } from "express";
import { bookSeat, generateSeatForAllSeat, getAllSeatsForSlot, getAvailableSeats } from "../controllers/SeatController";
const router = Router();
router.post("/generate-seat",generateSeatForAllSeat);
router.get("/:slotId/seats",getAvailableSeats);
router.post("/seat/book",bookSeat)
router.get("/all-seats/:slotId", getAllSeatsForSlot);

export default router;