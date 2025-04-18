import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Cities } from "../Modals/City";

const cities = async (req: Request, res: Response) => {
  const { city_name } = req.body;

  if (!city_name) {
     res.status(400).json({ message: "City name is required" });
     return;
  }

  try {
    const cityRepository = AppDataSource.getRepository(Cities);

    // Check if the city already exists
    const existCity = await cityRepository.findOneBy({
      city_name: city_name,
    });

    if (existCity) {
      res.status(400).json({ message: "City already exists" });
      return; 
    }

    // Create and save the new city
    const newCity = cityRepository.create({ city_name });
    await cityRepository.save(newCity);

     res
      .status(201)
      .json({ message: "City created successfully", city: newCity });
  } catch (error) {
    console.error("Error creating city:", error);
     res.status(500).json({ message: "Internal server error", error });
     return;
  }
};

const getCities = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);

  try {
    const cityRepository = AppDataSource.getRepository(Cities);
    if (id) {
      const city = await cityRepository.findOneBy({ id: parseInt(id) });

      if (!city) {
         res.status(404).json({ message: "City not found" });
         return;
      }

       res.status(200).json(city);
    }

    // If no ID is provided, return all cities
    const cities = await cityRepository.find();

    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
     res.status(500).json({ message: "Internal server error", error });
     return;
  }
};


export { cities, getCities };
