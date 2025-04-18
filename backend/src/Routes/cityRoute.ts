import { Router } from "express";
import { getCities, cities } from "../controllers/cityController";
const router = Router();
router.post("/addcity",cities)
router.get("/",getCities)
export default router;