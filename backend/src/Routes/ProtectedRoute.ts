import { Router } from "express";
import { authenticateToken } from "../middleware/Auth";
const router = Router();
router.get("/protected-route", authenticateToken, (req, res) => {
  console.log("User ID from Middleware:", req.body.userId);
  res.json({ msg: "Welcome to protectedRoute", userID: req.body.userId });
});

export default router;
