import { Router } from "express";
import { addMovie, deleteMovie, getMovie, updateMovie } from "../controllers/moviesController";

const router = Router(); 

router.post("/add-movie",addMovie);
router.get("/",getMovie)
router.put("/update",updateMovie)

router.delete("/deleteMovie/:movie_title",deleteMovie);
export default router