import { Router } from "express";
import { addDay } from "../controllers/dayController";
const router = Router();
router.post("/add-day", addDay);

export default router;
