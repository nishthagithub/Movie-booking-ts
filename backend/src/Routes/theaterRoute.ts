import { Router } from "express";
import { Request,Response } from "express";
import { addTheater, filterTheaterByChain, filterTheaterBySlotType, getAllTheater, sortTheatersByCity, sortTheatersByPrice } from "../controllers/theaterController";

const router = Router();
router.post("/addTheater",addTheater)
router.get("/",getAllTheater)
router.get("/filterByChain", (req: Request, res: Response) => {
  filterTheaterByChain(req, res);
});router.get("/price",sortTheatersByPrice)
router.get("/sorting-theater",sortTheatersByCity)
router.get("/sortbytype", filterTheaterBySlotType);
export default router;