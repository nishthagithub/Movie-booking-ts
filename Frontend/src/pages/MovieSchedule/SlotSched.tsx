import React, { useEffect, useState } from "react";
import { Stack, Box, Typography, Button } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AppDispatch, RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import { resetData, resetSlot, selectSlot,  } from "../../store/features/SlotSlice";
import { fetchAllSlots, fetchTheaters, setTheater } from "../../store/features/TheaterSlice";
import { fetchFilteredTheatersAlphabletically, fetchTheatersSortedAlphabetically } from "../../store/features/FilterSlice";

const SlotButton = styled(Button)(({ disabled }) => ({
  width: "77px",
  height: "40px",
  borderRadius: "4px",
  fontSize: "14px",
  textTransform: "none",
  border: "1px solid #9DA8BE",
  cursor: disabled ? "not-allowed" : "pointer",
  backgroundColor: disabled ? "#B0B0B0" : "",
  color: "#333333",
  "&:hover": {
    backgroundColor: disabled ? "#B0B0B0" : "#1A2C50",
    color: "white",
  },
}));

interface CustomComponentProps {
  selectedDayIndex: number | null;
  selectedDate: string
}

const CustomComponent: React.FC<CustomComponentProps> = ({
  selectedDayIndex,
  selectedDate,
}) => {
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [message, setMessage] = useState("");

  const [data, setData] = useState([]);
  const { id } = useParams<{ id: string }>();
  // console.log(id);
  
  const selectedCity = useSelector(
    (state: RootState) => state.theater.selectedCity
  );
  const dispatch = useDispatch<AppDispatch>();
  const selectedSlot = useSelector((state: RootState) => state.slot);
 

  const theater_type = useSelector(
    (state: RootState) => state.theater.selectedChain
  );
  const allSlots = useSelector((state: RootState) => state.theater.allSlots);

  console.log("all", allSlots);
  const filteredTheaters = useSelector(
    (state: RootState) => state.theater.allTheaters
  );
  console.log("filltereed", filteredTheaters);
    const API_URL = process.env.REACT_APP_URL;

  
  useEffect(() => {
    dispatch(fetchAllSlots());
  }, [dispatch]);
  const [allSlotss, setAllSlots] = useState<any[]>([]);
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/slot/`);
        setData(response.data);
        if (!id) {
          console.error("Error: URL parameter 'id' is undefined");
          return;
        }

        const movieObj = response.data.data.find(
          (movie: any) => movie.movie?.movie_id?.toString() === id
        );

        if (movieObj) {
          setSelectedMovie(movieObj);
          const selectedCityData = movieObj?.movie?.cities?.find(
            (city: any) => city.city_name === selectedCity
          );
          const selectedDayData = selectedCityData?.days?.find(
            (day: any) => Number(day.day) === Number(selectedDayIndex)
          );
          console.log(selectedDayData);
          const allSlotss =
            selectedDayData?.theaters?.map((theater: any) => ({
              ...theater,
              day: {
                index: Number(selectedDayIndex),
              },
            })) || [];
          console.log(allSlotss);

          setAllSlots(allSlotss); // Store the allSlots
        } else {
          console.error("Movie not found");
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };
    fetchMovieData();
  }, [id, selectedCity, selectedDayIndex]);


  useEffect(() => {
    const fetchFilteredTheaters = async () => {
      try {
        const movieId = selectedMovie?.movie?.movie_id;
        if (!movieId) {
          console.error("Movie ID is not available");
          return;
        }
        const selectedCityData = selectedMovie?.movie?.cities?.find(
          (city: any) => city.city_name === selectedCity
        );
        if (!selectedCityData) {
          console.error("City not found in movie data");
          return;
        }

        const cityId = selectedCityData?.city_id;
        console.log("City ID:", cityId);

        // Find the selected day data
        const selectedDayData = selectedCityData?.days?.find(
          (day: any) => Number(day.day) === Number(selectedDayIndex)
        );
        if (!selectedDayData) {
          console.error("Day not found for the selected index");
          return;
        }

        const dayId = selectedDayData?.day;
         if (movieId && cityId && dayId) {
        if (theater_type) {
          await dispatch(
            fetchTheaters({
              theater_type,
              city_id: Number(cityId),
              day_id: Number(dayId),
              movie_id: Number(movieId),
            })
          );
        }
        else {
          await dispatch(
            fetchFilteredTheatersAlphabletically({
              city_id: Number(cityId),
              day_id: Number(dayId),
              movie_id: Number(movieId),
            })
          );
        }
      }
        
      } catch (error) {
        console.error("Error fetching filtered theaters:", error);
      }
    };

    // Only trigger fetch if all necessary data is available
    if (
      selectedMovie &&
      selectedCity &&
      selectedDayIndex !== null 
      
    ) {
      fetchFilteredTheaters();
    } 
    
    
  }, [selectedMovie, selectedCity, selectedDayIndex, theater_type, dispatch]);
 
    const filtersApplied =
      selectedMovie &&
      selectedCity &&
      selectedDayIndex !== null 
      &&theater_type;

  const isFilteredResult = filtersApplied && filteredTheaters?.length > 0;
  const isFilteredEmpty = filtersApplied && filteredTheaters?.length === 0;
  

  const dataToRender = isFilteredResult
    ? filteredTheaters
    : !filtersApplied && allSlotss?.length > 0
    ? allSlotss
    : [];

  return (
    <>
      {dataToRender &&
      Array.isArray(dataToRender) &&
      dataToRender.length > 0 ? (
        dataToRender.map((theater, index) => {
          const selectedDayData = theater.day;
          const formattedDate = selectedDayData?.date || selectedDate;

          return (
            <Stack
              key={`${theater.theater_name}-${index}`}
              sx={{
                maxWidth: { xs: "400px", sm: "540px", md: "638px" },
                width: "100%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "center",
                padding: "10px",
                borderRadius: "8px",
                mb: 3,
              }}
            >
              {/* First Row - Theater Name and Type */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <CircleIcon sx={{ color: "#1A2C50", fontSize: 25 }} />
                    <StarIcon
                      sx={{
                        fontSize: 16,
                        position: "absolute",
                        top: "5px",
                        left: "5px",
                        color: "#F2C46F",
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: { sm: "1rem", md: "1.5rem" },
                      fontWeight: "bold",
                      color: "#333333",
                    }}
                  >
                    {theater.theater_name}
                  </Typography>
                </Stack>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#EC1E2B",
                    color: "#ffffff",
                    fontSize: "12px",
                    textTransform: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                  }}
                >
                  {theater.theater_type}
                </Button>
              </Stack>

              {/* Address */}
              <Typography
                sx={{
                  fontSize: { sm: "0.8rem", md: "1rem" },
                  marginTop: "0.6rem",
                  color: "grey",
                }}
              >
                {theater.theater_address}
              </Typography>

              {/* Slot Details */}
              {Array.isArray(theater.slots) && theater.slots.length > 0 ? (
                theater.slots.map((slot: any, slotIndex: any) => (
                  <React.Fragment key={slotIndex}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      width="100%"
                      mt={2}
                    >
                      <Typography
                        component="p"
                        sx={{ fontSize: "14px", color: "#5A637A", mt: 1 }}
                      >
                        {slot.slotType.type_name.toUpperCase()}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { sm: "0.8rem", md: "1.2rem" },
                          fontWeight: "400",
                          mt: 1,
                          color: "#81899D",
                        }}
                      >
                        ₹{slot.slotType.price}
                      </Typography>
                    </Stack>

                    <Stack direction="row" gap={2} flexWrap="wrap">
                      {slot.slot_times &&
                      Array.isArray(slot.slot_times) &&
                      slot.slot_times.length > 0 ? (
                        // This part handles when slot_times is an array
                        slot.slot_times.map((slotTime: any, timeIndex: any) => {
                          const timeValue = slotTime.time;
                          return (
                            <SlotButton
                              key={timeIndex}
                              sx={{
                                backgroundColor:
                                  selectedSlot.time === timeValue
                                    ? "#1A2C50"
                                    : "transparent",
                                color:
                                  selectedSlot.time === timeValue
                                    ? "white"
                                    : "#000",
                              }}
                              onClick={() => {
                                const slotData = {
                                  id: slot.slotType.id,
                                  slotId: slotTime.slot_id,
                                  slot: theater,
                                  format: slot.slotType.type_name,
                                  price: slot.slotType.price,
                                  location: theater.theater_address,
                                  theaterName: theater.theater_name,
                                  time: slotTime.time,
                                  date: formattedDate,
                                };
                                console.log(slotData);

                                dispatch(selectSlot(slotData));
                                dispatch(resetData());
                              }}
                            >
                              {timeValue}
                            </SlotButton>
                          );
                        })
                      ) : slot.slot_time ? (
                        // This part handles when slot_time is a single string (as in your filtered data)
                        <SlotButton
                          sx={{
                            backgroundColor:
                              selectedSlot.time === slot.slot_time
                                ? "#1A2C50"
                                : "transparent",
                            color:
                              selectedSlot.time === slot.slot_time
                                ? "white"
                                : "#000",
                          }}
                          onClick={() => {
                            const slotData = {
                              id: slot.slotType.id,
                              slotId: slot.id,
                              slot: theater,
                              format: slot.slotType.type_name,
                              price: slot.slotType.price,
                              location: theater.theater_address,
                              theaterName: theater.theater_name,
                              time: slot.slot_time,
                              date: formattedDate,
                            };
                            dispatch(selectSlot(slotData));
                            dispatch(resetData());
                          }}
                        >
                          {slot.slot_time}
                        </SlotButton>
                      ) : (
                        <Typography sx={{ mt: 1, color: "#5A637A" }}>
                          No times available
                        </Typography>
                      )}
                    </Stack>
                  </React.Fragment>
                ))
              ) : (
                <Typography sx={{ mt: 1, color: "#5A637A" }}>
                  {message && <Typography>{message}</Typography>}
                </Typography>
              )}
            </Stack>
          );
        })
      ) :  isFilteredEmpty ? (
  <Typography sx={{ mt: 2, color: "#EC1E2B" }}>
    No theaters found with the selected filters.
  </Typography>
):(
        <Typography sx={{ mt: 2, color: "#5A637A" }}>
          
            <Typography sx={{ mt: 2, color: "#FF0000" }}>
              No theaters found with this filter.
            </Typography>
          
        </Typography>
      )}
    </>
  );
};

export default CustomComponent;
