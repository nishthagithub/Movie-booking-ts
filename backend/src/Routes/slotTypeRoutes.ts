import { Router } from "express";
import { addSlotType,getAllSlotType,  } from "../controllers/slotTypeController";
const router = Router();

router.post("/add-types",addSlotType);
router.get("/",getAllSlotType);


export default router