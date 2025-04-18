import express, { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Theater } from "../Modals/Theater";
import { Cities } from "../Modals/City";
import { Day } from "../Modals/day";


export const addTheater = async(req:Request,res:Response)=>{
    try {
          const { theater_name, theater_type, theater_address, city } =
            req.body;
            console.log(req.body)

          const cityRepository = AppDataSource.getRepository(Cities);
          const theaterRepository = AppDataSource.getRepository(Theater);
          const cities = await cityRepository.findOneBy({id:city});
          if(!cities){
            res.status(404).json({ message: "City not found" });
            return;
          }

const newTheater = theaterRepository.create({
    theater_name,
    theater_type,
    theater_address,
    city
})
 await theaterRepository.save(newTheater);
  res
   .status(201)
   .json({ message: "Theater added successfully", theater: newTheater });
   return;
          
    } catch (error) {
         console.error(error);
          res.status(500).json({ message: "Internal server error", error });
          return;
    }
  
}
export const getAllTheater = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const theaterRepository = AppDataSource.getRepository(Theater);

    let theaters;

    if (id) {
      theaters = await theaterRepository.findOne({
        where: { id: Number(id) },
        relations: ["city", "slots", "slots.slotType","slots.day"], // Ensure these relations are fetched
      });

      if (!theaters) {
        res.status(404).json({ message: "Theater not found" });
        return;
      }
    } else {
      // Fetch all theaters with related entities
      theaters = await theaterRepository.find({
        relations: ["city", "slots", "slots.slotType", "slots.day"],
      });
    }

    res.status(200).json(theaters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const filterTheaterByChain = async (req: Request, res: Response) => {
  try {
    const { theater_type, day_id, movie_id, city_id } = req.query;
    console.log("Received query parameters:", {
      theater_type,
      day_id,
      movie_id,
      city_id,
    });

    if (
      theater_type === undefined ||
      day_id === undefined ||
      movie_id === undefined ||
      city_id === undefined
    ) {
      return res.status(400).json({
        message:
          "Please provide all required query parameters: theater_type, day_id, movie_id, city_id",
      });
    }

    const theaterRepository = AppDataSource.getRepository(Theater);
    const dayRepo = AppDataSource.getRepository(Day);

    const dayEntity = await dayRepo.findOne({
      where: { day: String(day_id) },
    });

    if (!dayEntity) {
      return res
        .status(400)
        .json({ message: `No day found for day: ${day_id}` });
    }

    const parsedDayId = dayEntity.id;

    const theaters = await theaterRepository.find({
      where: {
        theater_type: String(theater_type),
        slots: {
          day: { id: parsedDayId },
          movie: { movie_id: Number(movie_id) },
        },
        city: { id: Number(city_id) },
      },
      relations: [
        "slots",
        "slots.slotType",
        "slots.day",
        "slots.movie",
        "city",
      ],
    });

    if (theaters.length === 0) {
      return res
        .status(200)
        .json({ message: "No theaters found for the given filters" });
    }

    const groupedTheaters = theaters.map((theater) => {
      const slotGroups: Record<
        string,
        {
          slotType: {
            id: number;
            type_name: string;
            price: number;
          };
          slot_times: { time: string; slot_id: number }[];
        }
      > = {};

      theater.slots.forEach((slot) => {
        const typeName = slot.slotType.type_name;
        const price = slot.slotType.price;
        const key = `${typeName}_${price}`;

        if (!slotGroups[key]) {
          slotGroups[key] = {
            slotType: {
              id: slot.slotType.id,
              type_name: typeName,
              price: price,
            },
            slot_times: [],
          };
        }
        

         slotGroups[key].slot_times.push({
           time: slot.slot_time,
           slot_id: slot.id,
         });
      });

      return {
        id: theater.id,
        theater_name: theater.theater_name,
        theater_type: theater.theater_type,
        theater_address: theater.theater_address,
        city: theater.city,
        slots: Object.values(slotGroups),
      };
    });

    return res.status(200).json(groupedTheaters);
  } catch (error) {
    console.error("Error filtering theaters:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
export const filterTheaterBySlotType = async (req: Request, res: Response) => {
  try {
    const { day_id, movie_id, city_id,  } = req.query;
    console.log("Received query parameters:", {
      
      day_id,
      movie_id,
      city_id,
     
    });

    if (
      
      day_id === undefined ||
      movie_id === undefined ||
      city_id === undefined 
    ) {
       res.status(400).json({
        message:
          "Please provide all required query parameters: theater_name, day_id, movie_id, city_id, slot_type",
      });
      return;
    }

    const theaterRepository = AppDataSource.getRepository(Theater);
    const dayRepo = AppDataSource.getRepository(Day);

    const dayEntity = await dayRepo.findOne({
      where: { day: String(day_id) },
    });

    if (!dayEntity) {
       res
        .status(400)
        .json({ message: `No day found for day: ${day_id}` });
        return;
    }

    const parsedDayId = dayEntity.id;

    const theaters = await theaterRepository.find({
      where: {
        city: { id: Number(city_id) },
        slots: {
          day: { id: parsedDayId },
          movie: { movie_id: Number(movie_id) },
        },
      },
      relations: [
        "slots",
        "slots.slotType",
        "slots.day",
        "slots.movie",
        "city",
      ],
    });

    if (theaters.length === 0) {
       res
        .status(200)
        .json({ message: "No theaters found for the given filters" });
        return;
    }
     theaters.sort((a, b) => a.theater_name.localeCompare(b.theater_name));

    const groupedTheaters = theaters.map((theater) => {
      const slotGroups: Record<
        string,
        {
          slotType: {
            id: number;
            type_name: string;
            price: number;
          };
          slot_times: { time: string; slot_id: number }[];
        }
      > = {};

      theater.slots.forEach((slot) => {
        const typeName = slot.slotType.type_name;
        const price = slot.slotType.price;
        const key = `${typeName}_${price}`;

        if (!slotGroups[key]) {
          slotGroups[key] = {
            slotType: {
              id: slot.slotType.id,
              type_name: typeName,
              price: price,
            },
            slot_times: [],
          };
        }

        slotGroups[key].slot_times.push({
          time: slot.slot_time,
          slot_id: slot.id,
        });
      });

      return {
        id: theater.id,
        theater_name: theater.theater_name,
        theater_type: theater.theater_type,
        theater_address: theater.theater_address,
        city: theater.city,
        slots: Object.values(slotGroups),
      };
    });

    console.log("Found theaters:", groupedTheaters.length);
    res.status(200).json(groupedTheaters);
  } catch (error) {
    console.error("Error filtering theaters by slot type:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};







export const sortTheatersByPrice = async (req: Request, res: Response) => {
  try {
    const { order } = req.query; // "lowest" or "highest"

    const theaterRepository = AppDataSource.getRepository(Theater);
    const theaters = await theaterRepository
      .createQueryBuilder("theater")
      .leftJoinAndSelect("theater.slots", "slot")
      .leftJoinAndSelect("slot.slotType", "slotType")
      .leftJoinAndSelect("slot.day", "day") // Fetch slot days if needed
      .getMany();

    // Step 1: Extract slots with time & price, then sort them by price
    const theatersWithPrice = theaters.map((theater) => {
      const sortedSlots = theater.slots
        .map((slot) => ({
          time: slot.slot_time, // Correct slot time
          price: slot.slotType?.price, // Correct slot price
        }))
        .filter((slot) => slot.price !== undefined) // Remove undefined prices
        .sort((a, b) =>
          order === "highest" ? b.price - a.price : a.price - b.price
        ); // Sort based on order

      const minPrice = sortedSlots.length > 0 ? sortedSlots[0].price : Infinity;
      const maxPrice =
        sortedSlots.length > 0 ? sortedSlots[sortedSlots.length - 1].price : 0;

      return {
        theater_name: theater.theater_name,
        priceToSort: order === "highest" ? maxPrice : minPrice,
        sortedSlots, // Include sorted slot times & prices
      };
    });

    // Step 2: Sort theaters based on price
    const sortedTheaters = theatersWithPrice.sort((a, b) =>
      order === "highest"
        ? b.priceToSort - a.priceToSort
        : a.priceToSort - b.priceToSort
    );

    res.status(200).json({ data: sortedTheaters });
  } catch (error) {
    console.error("Error sorting theaters by price:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sortTheatersByCity = async (req: Request, res: Response) => {
  try {
    const { movie_id, day_id, city_id, order } = req.query;
    console.log("Received query parameters:", {
      day_id,
      movie_id,
      city_id,
      order
    });

    const theaterRepository = AppDataSource.getRepository(Theater);
     const dayRepo = AppDataSource.getRepository(Day);

     const dayEntity = await dayRepo.findOne({
       where: { day: String(day_id) },
     });
      if (!dayEntity) {
         res
          .status(400)
          .json({ message: `No day found for day: ${day_id}` });
          return;
      }

      const parsedDayId = dayEntity.id;

    // Fetch filtered theaters only
    const theaters = await theaterRepository.find({
      where: {
        // theater_type: String(theater_type),
        slots: {
          day: { id: parsedDayId },
          movie: { movie_id: Number(movie_id) },
        },
        city: { id: Number(city_id) },
      },
      relations: [
        "slots",
        "slots.slotType",
        "slots.day",
        "slots.movie",
        "city",
      ],
    });

    if (theaters.length === 0) {
       res
        .status(200)
        .json({ message: "No theaters found for the given filters" });
        return;
    }

    const processed = theaters.map((theater) => {
      const slotGroups: Record<
        string,
        {
          slotType: {
            id: number;
            type_name: string;
            price: number;
          };
          slot_times: { time: string; slot_id: number }[];
        }
      > = {};

      theater.slots.forEach((slot) => {
         const typeName = slot.slotType.type_name;
         const price = slot.slotType.price;
         const key = `${typeName}_${price}`;
        if (!slotGroups[key]) {
          slotGroups[key] = {
            slotType: {
              id: slot.slotType.id,
              type_name: typeName,
              price: price,
            },
            slot_times: [],
          };
        }

        slotGroups[key].slot_times.push({
          time: slot.slot_time,
          slot_id: slot.id,
        });
      });

      return {
        id: theater.id,
        theater_name: theater.theater_name,
        theater_type: theater.theater_type,
        theater_address: theater.theater_address,
        city: theater.city,
        slots: Object.values(slotGroups),
      };
    });

    // Sort alphabetically by theater name
    const sorted = processed.sort((a, b) =>
      order === "desc"
        ? b.theater_name.localeCompare(a.theater_name)
        : a.theater_name.localeCompare(b.theater_name)
    );

    res.status(200).json(sorted);
  } catch (error) {
    console.error("Error fetching sorted theaters:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

















