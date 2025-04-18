import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { SlotData } from "../Modals/SlotData";
import { Day } from "../Modals/day";
import { Theater } from "../Modals/Theater";
import { SlotType } from "../Modals/SlotType";
import { Movies } from "../Modals/Movies";
import {
  MovieData,
  City,
  DayTheaterData,
  Theaters,
  SlotTypee,
  SlotTime,
} from "../types/SlotData";

export const addSlots = async (req: Request, res: Response) => {
  try {
    const { slot_times, slotTypeId, theaterId, dayId, movieMovieId } = req.body;
    console.log("Received Data:", req.body);

    // ✅ Validate Inputs
    if (!slot_times || !Array.isArray(slot_times) || slot_times.length === 0) {
       res
        .status(400)
        .json({ message: "Slot times must be a non-empty array" });
        return;
    }
    if (!slotTypeId || !theaterId || !dayId || !movieMovieId) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // ✅ Get Repositories
    const slotRepository = AppDataSource.getRepository(SlotData);
    const theaterRepository = AppDataSource.getRepository(Theater);
    const dayRepository = AppDataSource.getRepository(Day);
    const slotTypeRepository = AppDataSource.getRepository(SlotType);
    const movieRepository = AppDataSource.getRepository(Movies);

    
    const [day, theater, slotType, movie] = await Promise.all([
      dayRepository.findOne({ where: { id: Number(dayId) } }),
      theaterRepository.findOne({ where: { id: Number(theaterId) } }),
      slotTypeRepository.findOne({ where: { id: Number(slotTypeId) } }),
      movieRepository.findOne({ where: { movie_id: Number(movieMovieId) } }),
    ]);

    console.log("Fetched Data:", { day, theater, slotType, movie });

    if (!day || !theater || !slotType || !movie) {
     res
        .status(400)
        .json({ message: "Invalid Day, Theater, Slot Type, or Movie" });
        return;
    }

   
    const slotEntries = slot_times.map((time) => {
      const newSlot = new SlotData();
      newSlot.slot_time = time;
      newSlot.theater = theater;
      newSlot.slotType = slotType;
      newSlot.day = day; 
      newSlot.movie = movie; 
      return newSlot;
    });

    // ✅ Save to Database
    await slotRepository.save(slotEntries);

     res
      .status(201)
      .json({ message: "Slots added successfully", data: slotEntries });
  } catch (error) {
    console.error("Error adding slots:", error);
     res.status(500).json({ message: "Internal Server Error" });
     return;
  }
};
export const getMoviesWithSlots = async (req: Request, res: Response) => {
  try {
    const movieRepository = AppDataSource.getRepository(Movies);

    // Fetch all movies and include related data
    const movies = await movieRepository.find({
      relations: [
        "slots",
        "slots.theater",
        "slots.slotType",
        "slots.day",
        "slots.theater.city",
      ],
    });

    // Transform data to match the required format
    const formattedMovies = movies.map((movie) => {
      
      const citiesMap: { [key: string]: any } = {};

      movie.slots.forEach((slot) => {
        const city = slot.theater.city;
        const cityName = city.city_name;
        const cityId = city.id;

        if (!citiesMap[cityName]) {
          citiesMap[cityName] = {
            city_id: cityId,
            city_name: cityName,
            days: {},
          };
        }

        const dayNumber = slot.day.day;

        if (!citiesMap[cityName].days[dayNumber]) {
          citiesMap[cityName].days[dayNumber] = {
            day: dayNumber,
            theaters: {},
          };
        }

        const theaterName = slot.theater.theater_name;
        

        if (!citiesMap[cityName].days[dayNumber].theaters[theaterName]) {
          citiesMap[cityName].days[dayNumber].theaters[theaterName] = {
            id:slot.theater.id,
            theater_name: slot.theater.theater_name,
            theater_type: slot.theater.theater_type,
            theater_address: slot.theater.theater_address,
            slots: [],
          };
        }
        const existingSlot = citiesMap[cityName].days[dayNumber].theaters[
          theaterName
        ].slots.find((s:any) => s.slotType.type_name === slot.slotType.type_name);
        if(existingSlot){
          existingSlot.slot_times.push({
            time: slot.slot_time,
            slot_id: slot.id,
          });
        }
       else{
citiesMap[cityName].days[dayNumber].theaters[theaterName].slots.push({
  slotType: {
    id: slot.slotType.id,
    type_name: slot.slotType.type_name,
    price: slot.slotType.price,
  },
  slot_times: [
    {
      time: slot.slot_time,
      slot_id: slot.id,
    },
  ],
});
       }
        
      });

      // Convert cities object to array
      const citiesArray: City[] = Object.values(citiesMap).map((city) => ({
        ...city,
        days: Object.values(city.days as Record<string, DayTheaterData>).map(
          (day) => ({
            ...day,
            theaters: Object.values(day.theaters),
          })
        ),
      }));
      

      return {
        movie: {
          movie_id:movie.movie_id,
          movie_title: movie.movie_title,
          movie_duration: movie.movie_duration,
          movie_genere: movie.movie_genere,
          movie_poster: movie.movie_poster,
          movie_director: movie.movie_director,
          movie_rating: movie.movie_rating,
          cities: citiesArray,
        },
      };
    });

    res.status(200).json({
      message: "Movies fetched successfully",
      data: formattedMovies,
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

