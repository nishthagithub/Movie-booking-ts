import { Router } from "express";
import {getProfile, login, logout, profilePic, signup} from "../controllers/userController"; 

const router = Router(); 

router.post("/", signup); 
router.post("/login",login)
router.post("/logout",logout)
router.post("/profile-picture",profilePic)
router.get("/profile/:id",getProfile)
export default router;
