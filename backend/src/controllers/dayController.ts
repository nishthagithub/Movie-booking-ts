import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Day } from "../Modals/day";

export const addDay = async (req: Request, res: Response) => {
  try {
    const { day } = req.body; 

    if (!day) {
       res.status(400).json({ message: "Day name is required" });
       return;
    }

    const dayRepository = AppDataSource.getRepository(Day);

    // Check if the day already exists to avoid duplicates
    const existingDay = await dayRepository.findOne({ where: { day: day } });

    if (existingDay) {
      res.status(400).json({ message: "Day already exists" });
      return; 
    }

   
    const newDay = new Day();
    newDay.day = day;

    await dayRepository.save(newDay);

    res.status(201).json({ message: "Day added successfully", data: newDay });
  } catch (error) {
    console.error("Error adding day:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
