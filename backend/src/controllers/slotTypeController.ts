import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { SlotType } from "../Modals/SlotType";
import { Theater } from "../Modals/Theater";

export const addSlotType = async (req: Request, res: Response) => {
  try {
    const { type_name, price } = req.body;

    const slotTypeRepository = AppDataSource.getRepository(SlotType);

    
    const existingSlotType = await slotTypeRepository.findOne({
      where: { type_name },
    });
    if (existingSlotType) {
      res.status(400).json({ message: "Slot Type already exists" });
       return;
    }

    
    const newSlotType = new SlotType();
    newSlotType.type_name = type_name;
    newSlotType.price = price;

    
    await slotTypeRepository.save(newSlotType);

   res
      .status(201)
      .json({ message: "Slot Type added successfully", data: newSlotType });
        return;
  } catch (error) {
    console.error("Error adding slot type:", error);
     res.status(500).json({ message: "Internal Server Error" });
     return;
  }
};

export const getAllSlotType = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const slotTypeRepository = AppDataSource.getRepository(SlotType);

    if (id) {
      const slotType = await slotTypeRepository.findOne({
        where: { id: Number(id) },
      });

      if (!slotType) {
        res.status(404).json({ message: "Slot Type not found" });
         return;
      }
       res.status(200).json({ data: slotType });
    }

    // If no ID is provided, return all slot types
    const allSlotTypes = await slotTypeRepository.find();
     res.status(200).json({ data: allSlotTypes });
     return;
  } catch (error) {
    console.error("Error fetching slot types:", error);
     res.status(500).json({ message: "Internal Server Error" });
     return;
  }
};





