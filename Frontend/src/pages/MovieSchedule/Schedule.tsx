import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import SeachBar from "./SeachBar";
import { useDispatch, useSelector } from "react-redux";
import DropdownWithSearch from "./Dropdown";
import SlotSched from "./SlotSched";
import ASSETS from "../../Assets/index";
import DateSlots from "./DateSlots";
import Ticket from "./Ticket";
import { RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import axios from "axios";
import { selectMovie } from "../../store/features/moveSlice";

interface Movie {
  movie_title: string;
  movie_duration: string;
  movie_genere: string;
  movie_poster: string;
  movie_director: string;
  movie_rating: string;
}

const Schedule: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const selectedMovie = useSelector(
    (state: RootState) => state.movie.selectedMovie
  );
  console.log(selectedMovie)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
console.log(selectedIndex)
const dispatch = useDispatch();
const { id } = useParams<{ id: string }>();

 const [movie, setMovie] = useState<Movie | null>(null);
  const API_URL = process.env.REACT_APP_URL;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (!id) return; 

        const response = await axios.get(
          `${API_URL}/api/movie?movieId=${id}`
        ).then(response=>{
          console.log(response.data)
          setMovie(response.data)
          dispatch(selectMovie(response.data))
        })
        
      } catch (error) {
         console.error("Error fetching movie data:", error);
      }
    };

    fetchMovie(); 
  }, [id]); 

  

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Container
        sx={{
          marginLeft: { sm: "0rem", xs: "0rem", md: "2rem" },
          marginTop: "1.5rem",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "1rem", sm: "1.2rem", md: "2rem" },
            fontWeight: "700",
            color: "#333333",
          }}
        >
          Schedule
        </Typography>
        <Typography style={{ color: "#5A637A", fontSize: "1rem" }}>
          Choose the movie schedule you want to watch.
        </Typography>

        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: { xs: "center", sm: "center", md: "flex-start" },
            justifyContent: "space-between",
            gap: "2rem",
            // marginTop: "1.5rem",
          }}
        >
          <Stack
            sx={{
              maxWidth: { xs: "382px", sm: "480px", md: "622px" },
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: isMobile ? "8px" : 3,
            }}
          >
            {/* Navigation Controls and Date Selection */}

            <DateSlots
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              setSelectedDate={setSelectedDate}
              setSelectedDay={setSelectedDay}
            />

            {/* Divider */}
            <Box
              sx={{
                maxWidth: "638px",
                height: "1px",
                bgcolor: "red",
                mt: 2,
              }}
            />

            {/* Search Bar and Dropdown in a New Row */}
            <Stack
              sx={{
                width: "100%",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "center",
                gap: "10px",
                mt: 1,
              }}
            >
              <SeachBar />
              <DropdownWithSearch />
              <SlotSched
                selectedDayIndex={selectedIndex}
                selectedDate={selectedDate}
              />
            </Stack>
          </Stack>

          <Box
            sx={{
              maxWidth: { xs: "350px", sm: "400px", md: "413px" },
              // height: { xs: "auto", sm: "250px", md: "593px" },
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "column" },
              alignItems: { xs: "center", md: "center", lg: "flex-start" },
              textAlign: "left",
              justifyContent: "flex-start",
              gap: "1rem",
              marginLeft: { sm: "0", md: "12rem" },
            }}
          >
            <Box
              component="img"
              src={movie?.movie_poster}
              alt="Movie Poster"
              sx={{
                width: { xs: "80%", md: "413px" },
                height: { xs: "280px", md: "364px" },
                borderRadius: "8px",
                objectFit: "cover",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            />

            <Typography
              sx={{ fontWeight: "500", mt: "1rem", fontSize: "1.5rem" }}
            >
              {movie?.movie_title}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{ color: "#333333", fontSize: "1rem" }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#333333", fontSize: "1rem" }}
              >
                Genre:
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#333333" }}
              >
                {movie?.movie_genere}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{ color: "#333333", fontSize: "1rem" }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#333333", fontSize: "1rem" }}
              >
                Duration:
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#333333" }}
              >
                {movie?.movie_duration}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{ color: "#333333", fontSize: "1rem" }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#333333", fontSize: "1rem" }}
              >
                Director:
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#333333" }}
              >
                {movie?.movie_director}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{ color: "#333333", fontSize: "1rem" }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#333333", fontSize: "1rem" }}
              >
                Rating:
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#333333" }}
              >
                {movie?.movie_rating}
              </Typography>
            </Stack>
            <Typography sx={{}}>
              <Ticket />
            </Typography>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default Schedule;
