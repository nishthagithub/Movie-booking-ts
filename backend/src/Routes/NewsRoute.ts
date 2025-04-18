import { Router } from "express";
import { getAllNews } from "../controllers/NewsController";
const router = Router();
router.get('/', getAllNews);
export default router;