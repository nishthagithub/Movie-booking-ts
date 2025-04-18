import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../Modals/User";
import { generateAuthToken } from "../middleware/Auth";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloundinaryConfig";
import { UploadedFile } from "express-fileupload";
const data = {

}
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, phnnumber, password, confirmpassword } = req.body;
  console.log("Request Body:", req.body);

  if (!email || !phnnumber || !password || !confirmpassword) {
    res.status(400).json({ error: "All fields are required" });
    return; 
  }

  if (password !== confirmpassword) {
     res.status(400).json({ error: "Passwords do not match" });
     return; 
  }

  try {
    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOneBy({email});
    console.log("Existing User:", existingUser);

    if (existingUser) {
       res.status(400).json({ error: "User already exists" });
       return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = userRepository.create({
      email,
      phnnumber,
      password: hashedPassword,
      confirmpassword: hashedPassword,
      profilePicture: email.charAt(0).toUpperCase(),
    });

    const savedUser = await userRepository.save(userData);
    console.log("Saved User:", savedUser);

     res.status(201).json({
      msg: "User Created Successfully",
      userID: savedUser.id,
      
    });
  } catch (error) {
    
    console.error("Error:", error); 
     res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async(req: Request, res: Response): Promise<void>=>{
  const {email,password} = req.body;
  if(!email || !password){
    res.status(400).json({error:"Email and password is required"});
    return;
  }
  try{
   const userRepository = AppDataSource.getRepository(User);
   const user = await userRepository.findOneBy({email});
   if(!user){
    res.status(400).json({error:"Invalid Email or Password"});
    return;
   }
   const isValidPassword = await bcrypt.compare(password, user.password);
   if(!isValidPassword){
    res.status(400).json({error:"Invalid Email or Password"});
    return;
   }
   const token = generateAuthToken(req,res,user.id);
   console.log("userController",token)
   console.log("Set-Cookie Header:", res.getHeaders()["set-cookie"]);

   res.status(200).json({
     msg: "Login Successful",
     user: {
       userID: user.id,
       email: user.email,
       password: user.password,
     },
   });
   
  }
  catch(error){
  console.log(error)
  res.json({error:"Internal Server Error"})
  }
 

}

export const logout = async(req:Request,res:Response)=>{
  res.clearCookie("token",{
    httpOnly: true,
    secure:true
  });
  res.status(200).json({msg:"logout Successfully"})
}

export const profilePic = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
const profilePic = req.files?.profilePicture as UploadedFile;    if (!userId || !profilePic) {
   res.status(400).json({ error: "User ID and file are required" });
   return;
}
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: parseInt(userId) });
    if (!user) {
       res.status(404).json({ error: "User not found" });
       return;
    }
     const result = await cloudinary.uploader.upload(
       profilePic.tempFilePath,
       (err, result) => {
         console.log(result);
       }
     );
     user.profilePicture = result.secure_url;
     await userRepository.save(user);
     res.status(200).json({
       message: "Profile picture uploaded successfully",
       imageUrl: result.secure_url,
     });
    
  } catch (error) {
      res.status(500).json({ error: "Internal server error" });
      return;
  }
};
export const getProfile = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: parseInt(userId) },
    });
     if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
     }
       res.json({
        email: user.email,
        profilePicture: user.profilePicture,
      });
      return;
    
  } catch (error) {
    console.error("Error fetching user profile:", error);
     res.status(500).json({ error: "Internal server error" });
     return;
  }
};
 export default data


