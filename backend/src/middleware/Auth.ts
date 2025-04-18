import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const secretKey = "1235888"; // Store this securely in `.env`

export const generateAuthToken = (req:Request,res:Response,userId: number): string => {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
   res.cookie("token", token, {
     httpOnly: true, // Security: Prevent JavaScript access
     secure: false, // For local testing (change to true in production)
    //  sameSite: "Lax", // Better security and cross-site compatibility
     path: "/",
     maxAge: 60 * 60 * 1000, // 1 hour expiration
   });
   console.log("cookie",res.cookie)
   console.log("Cookie set successfully");
   return token;
};
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;
  console.log("tokennn",token)
  // const authHeader = req.headers.authorization;
  if(!token){
     res.status(401).json({ message: "Unauthorized" });
     return;
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { userId: number };
    req.body.userId = decoded.userId; // Correctly passing `userId` to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};