import express,{Request,Response} from "express"
import { AppDataSource } from "../config/data-source";
import { Movies } from "../Modals/Movies";
import cloudinary from "../config/cloundinaryConfig";

export const addMovie = async(req:Request,res:Response)=>{
  const {
    movie_title,
    movie_duration,
    movie_genere,
    // movie_poster,
    movie_director,
    movie_rating,
  } = req.body;

const movie_poster = req.files?.movie_poster;

  console.log(req.body)
  if (!movie_title || !movie_duration || !movie_genere ||  !movie_director || !movie_rating) {
     res.status(400).json({ message: "Please fill in all fields" });
     return;
  }
   if (!movie_poster || Array.isArray(movie_poster)) {
      res.status(400).json({ message: "Poster is required" });
      return;;
   }

  try {
    const userRepository = AppDataSource.getRepository(Movies);
    const existMovie = await userRepository.findOneBy({movie_title});
    console.log("Movie exits")
    if (existMovie) {
         res.status(400).json({ message: "Movie already exists" });
         return;
    }
    const uploadPoster = await cloudinary.uploader.upload(movie_poster.tempFilePath, (err,result)=>{
        console.log(result)
    });
    const newMovie = new Movies();
    newMovie.movie_title = movie_title;
    newMovie.movie_duration = movie_duration;
    newMovie.movie_genere = movie_genere;
    newMovie.movie_poster = uploadPoster.secure_url;
    newMovie.movie_director = movie_director;
    newMovie.movie_rating = movie_rating;
    await userRepository.save(newMovie);
     res.status(201).json({ message: "Movie added successfully" });
     console.log(newMovie)

  } catch (error) {
    console.log(error);
     res.status(500).json({ message: "Internal Server Error" }); 
     return;  
  }
}

export const getMovie = async (req: Request, res: Response) => {
    const {movieId}=req.query;
    console.log(movieId);
    try {
        const userRepository = AppDataSource.getRepository(Movies);
        if (movieId) {
          const movie = await userRepository.findOne({
            where: { movie_id: Number(movieId) },
            select: [
              "movie_id",
              "movie_title",
              "movie_duration",
              "movie_genere",
              "movie_poster",
              "movie_director",
              "movie_rating",
            ],
          });
          if (!movie) {
            res.status(404).json({ message: "Movie not found" });
            return
          }
          res.status(200).json(movie);
          return;
        } else {
          const movies = await userRepository.find({
            select: ["movie_id", "movie_title", "movie_poster"],
          });
          res.status(200).json(movies);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const updateMovie = async (req: Request, res: Response) => {
const movieId = Number(req.query.movieId);

  const {
    movie_title,
    movie_duration,
    movie_genere,
    movie_director,
    movie_rating,
  } = req.body;

  const movie_poster = req.files?.movie_poster;

  try {
    const userRepository = AppDataSource.getRepository(Movies);
    const existingMovie = await userRepository.findOneBy({
      movie_id: Number(movieId),
    });

    if (!existingMovie) {
       res.status(404).json({ message: "Movie not found" });
       return;
    }

    if (movie_poster && !Array.isArray(movie_poster)) {
      const uploadPoster = await cloudinary.uploader.upload(
        movie_poster.tempFilePath,
        (err, result) => {
          console.log(result);
        }
      );
      existingMovie.movie_poster = uploadPoster.secure_url;
    }

    existingMovie.movie_title = movie_title || existingMovie.movie_title;
    existingMovie.movie_duration =
      movie_duration || existingMovie.movie_duration;
    existingMovie.movie_genere = movie_genere || existingMovie.movie_genere;
    existingMovie.movie_director =
      movie_director || existingMovie.movie_director;
    existingMovie.movie_rating = movie_rating || existingMovie.movie_rating;

    await userRepository.save(existingMovie);

    res
      .status(200)
      .json({ message: "Movie updated successfully", data: existingMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const deleteMovie = async (req: Request, res: Response) => {
  const { movie_title } = req.params; // Getting movie_title from URL params

  try {
    const userRepository = AppDataSource.getRepository(Movies);
    const movieToDelete = await userRepository.findOneBy({ movie_title });

    if (!movieToDelete) {
       res.status(404).json({ message: "Movie not found" });
       return;
    }

    await userRepository.remove(movieToDelete);

    res
      .status(200)
      .json({ message: `Movie "${movie_title}" deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const movieData={

}

export default movieData