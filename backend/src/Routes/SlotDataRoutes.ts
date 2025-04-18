import { Router } from "express";
import { addSlots, getMoviesWithSlots } from "../controllers/SlotDataController";
const router = Router();
router.post("/add-slot",addSlots)
router.get("/",getMoviesWithSlots)

export default router