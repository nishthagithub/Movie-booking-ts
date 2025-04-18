import { Request,Response } from "express";
import { AppDataSource } from "../config/data-source";

// import { getRepository } from "typeorm";
import { SlotData } from "../Modals/SlotData";
import { Seat } from "../Modals/Seat";

export const generateSeatForAllSeat = async(req:Request,res:Response)=>{
    const slotRepository = AppDataSource.getRepository(SlotData);
    const seatRepository = AppDataSource.getRepository(Seat);

    try {
        const slots = await slotRepository.find();
        const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
        const columns = 20;
        for (const slot of slots) {
      const seats: Seat[] = [];

      for (const row of rows) {
        for (let col = 1; col <= columns; col++) {
          const seatNumber = `${row}${col}`;
          const seat = seatRepository.create({
            seat_number: seatNumber,
            slot: slot,
          });
          seats.push(seat);
        }
      }
      await seatRepository.save(seats)
    } 
    res
      .status(201)
      .json({ message: "Seats generated for all slots successfully." });       
    } catch (error) {
        res
          .status(500)
          .json({ message: "Error generating seats for slots", error });
    }
}

export const getAvailableSeats = async (req: Request, res: Response) => {
  const { slotId } = req.params; 
  const seatRepository = AppDataSource.getRepository(Seat);

  try {
    const availableSeats = await seatRepository.find({
      where: {
        slot: { id: parseInt(slotId, 10) }, 
        isBooked: false,
      },
      
    });

    res.status(200).json(availableSeats);
  } catch (error) {
    console.error("Error fetching available seats:", error);
    res.status(500).json({
      message: "An error occurred while fetching available seats.",
      
    });
  }
};

export const bookSeat = async (req: Request, res: Response) => {
  const { seatIds } = req.body; // expecting array

  const seatRepository = AppDataSource.getRepository(Seat);

  if (!Array.isArray(seatIds) || seatIds.length === 0) {
     res
      .status(400)
      .json({ message: "seatIds must be a non-empty array" });
      return;
  }

  try {
    const seats = await seatRepository.findByIds(seatIds);

    // Check for any invalid or already booked seats
    const notFoundIds = seatIds.filter(
      (id) => !seats.find((seat) => seat.id === id)
    );

    const alreadyBooked = seats
      .filter((seat) => seat.isBooked)
      .map((seat) => seat.id);

    if (notFoundIds.length > 0) {
       res
        .status(404)
        .json({ message: "Some seats not found", notFoundIds });
        return;
    }

    if (alreadyBooked.length > 0) {
       res
        .status(400)
        .json({ message: "Some seats are already booked", alreadyBooked });
        return;
    }

    // Mark all as booked
    for (const seat of seats) {
      seat.isBooked = true;
    }

    await seatRepository.save(seats);

    res
      .status(200)
      .json({ message: "Seats booked successfully", bookedSeats: seatIds });
  } catch (error) {
    res.status(500).json({
      message: "Error booking seats",
      error,
    });
  }
};


export const getAllSeatsForSlot = async (req: Request, res: Response) => {
  const { slotId } = req.params;
  const seatRepository = AppDataSource.getRepository(Seat);

  const parsedSlotId = parseInt(slotId, 10);

  if (isNaN(parsedSlotId)) {
     res.status(400).json({ message: "Invalid slot ID" });
     return;
  }

  try {
    const allSeats = await seatRepository.find({
      where: {
        slot: { id: parsedSlotId },
      },
      order: {
        seat_number: "ASC",
      },
      relations: ["slot"],
    });
   const sortedSeats = allSeats.sort((a, b) =>
     a.seat_number.localeCompare(b.seat_number, undefined, {
       numeric: true,
       sensitivity: "base",
     })
   );
   const rows = 8;
   const cols = 20;
   const seatGrid: Seat[][] = [];
    for (let i = 0; i < rows; i++) {
      const rowSeats = sortedSeats.slice(i * cols, (i + 1) * cols);
      seatGrid.push(rowSeats);
    }
    // console.log("Formatted Seat Grid:");
    seatGrid.forEach((row, i) => {

    });

  //  console.log(sortedSeats)


// console.log(allSeats);
    // console.log("Received slotId:", parsedSlotId);
    res.status(200).json(seatGrid);
  } catch (error) {
    console.error("Error fetching all seats:", error);
    res.status(500).json({
      message: "An error occurred while fetching all seats.",
    });
  }
};



