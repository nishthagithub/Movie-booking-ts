import { Box, Button, IconButton, Typography, useMediaQuery } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetSlot } from "../store/features/SlotSlice";
const ImageSlider: React.FC = () => {
  
  interface Movie {
    movie_id: number;
    movie_title: string;
    movie_poster: string;
  }
  const navigate = useNavigate();
  
  const [index, setIndex] = useState(0);
const [movies, setMovies] = useState<Movie[]>([]);
 const [selectedMovieId, setSelectedMovieId] = useState(null);
const dispatch = useDispatch();
 const API_URL = process.env.REACT_APP_URL;
 
  useEffect(()=>{
   const fetchMovies = async()=>{
    try {
       const response = await axios.get<Movie[]>(`${API_URL}/api/movie`);
       console.log(response);
       setMovies(response.data)
     } catch (error) {
      console.log(error);
      
    }
   }
   fetchMovies();
  },[])

 
  const isMobile = useMediaQuery("(max-width: 600px)"); // Mobile
  const isTablet = useMediaQuery("(min-width: 601px) and (max-width: 1024px)"); // Tablet


const handlePrev = () => {
  setIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
};

  const handleNext = () => {
    setIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        marginTop: "3rem",
        minHeight: "500px",
        position: "relative",
      }}
    >
      {/* Left Arrow (Hidden in Mobile) */}
      {!isMobile && (
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            color: "black",
            bgcolor: "white",
            boxShadow: "2px 2px 6px #333",
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
        >
          <ChevronLeft sx={{ fontSize: 40 }} />
        </IconButton>
      )}

      {isMobile && (
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: "8%",
            top: "50%",
            transform: "translateY(-50%)",
            color: "black",
            bgcolor: "white",
            boxShadow: "2px 2px 6px #333",
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
        >
          <ChevronLeft sx={{ fontSize: 20 }} />
        </IconButton>
      )}

      {/* Image Display */}
      <Box display="flex" flexDirection="row" gap={7} overflow="hidden">
        {Array.isArray(movies) &&
          movies.slice(0, isMobile ? 1 : isTablet ? 1 : 2).map((movie, i) => {
            const imgIndex = (index + i) % movies.length;
            const handleImageClick = (imgIndex: any) => {
              navigate(`/movie/${imgIndex}`, {
                state: { movie: movies[imgIndex] },
              });
            };
            return (
              <Box
                key={movie.movie_id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Link
                  to={`/movie/${movies[imgIndex].movie_id}`}
                  onClick={() => {
                    dispatch(resetSlot());
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "300px", sm: "380px", md: "500px" },
                      height: { xs: "auto", sm: "auto", md: "650px" },
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={movies[imgIndex].movie_poster}
                      alt="Movie Poster"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                      onClick={() =>
                        navigate(`/movie/${movies[imgIndex].movie_id}`)
                      }
                    />
                  </Box>
                </Link>

                {/* Movie Title (Only shown in Tablet and Desktop) */}
                <Typography variant="h5" mt={2} textAlign="center">
                  {movies[imgIndex].movie_title}
                </Typography>
                <Box display="flex" justifyContent="center" gap={2} mt={2}>
                  <Button
                    variant="contained"
                    sx={{
                      background:
                        "linear-gradient(to right ,rgba(242, 196, 111, 1),rgba(198, 148, 63, 1))",
                      "&:hover": { bgcolor: "rgba(198, 148, 63, 1)" },
                    }}
                  >
                    XXI
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "rgba(236, 30, 43, 1)" }}
                  >
                    CGV
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "rgba(0, 14, 98, 1)" }}
                  >
                    CinePolis
                  </Button>
                </Box>
              </Box>
            );
          })}
      </Box>

      {/* Right Arrow (Hidden in Mobile) */}
      {!isMobile && (
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            color: "black",
            bgcolor: "white",
            boxShadow: "2px 2px 6px #333",
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
        >
          <ChevronRight sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      {isMobile && (
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: "8%",
            top: "50%",
            transform: "translateY(-50%)",
            color: "black",
            bgcolor: "white",
            boxShadow: "2px 2px 6px #333",
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
        >
          <ChevronRight sx={{ fontSize: 20 }} />
        </IconButton>
      )}
    </Box>
  );
};

export default ImageSlider;
