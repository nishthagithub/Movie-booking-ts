import { Box, Stack, Typography, TextField, InputAdornment, ClickAwayListener } from "@mui/material";
import { useState, useEffect } from "react";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { selectCity } from "../../store/features/TheaterSlice";
// import { theaterData } from "../../store/features/Data";
import { RootState } from "../../store/store";
import axios from "axios";

const SearchBar = () => {
  const dispatch = useDispatch();
  // const selecteddCity = useSelector(
  //   (state: RootState) => state.theater.selectedCity
  // );

  const [showDropdown, setShowDropdown] = useState(false);
  const [city, setCity] = useState<any[]>([]);
   const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
   const [selectedCity, setSelectedCity] = useState("Surat");
const [filteredTheaters, setFilteredTheaters] = useState<any[]>([]); 
 const [searchTerm, setSearchTerm] = useState("");
   
  const API_URL = process.env.REACT_APP_URL;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/city/`);
        // console.log(response.data);
        setCity(response.data); 
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []); 
   useEffect(() => {
     if (selectedCityId !== null) {
       const fetchTheaters = async (id: any) => {
         try {
           const response = await axios.get(
             `${API_URL}/api/theater/?id=${id}`
           );
           console.log("API Response:", response.data);
           const suratTheaters = Array.isArray(response.data)
             ? response.data
             : [response.data];
           setFilteredTheaters(suratTheaters);
         } catch (error) {
           console.error("Error fetching theaters:", error);
         }
       };
       fetchTheaters(selectedCityId);
     }
   }, [selectedCityId]);
   console.log(selectedCityId)


  return (
    <div>
      <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
        <Box sx={{ position: "relative", display: "inline-block" }}>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ maxWidth: "300px", cursor: "pointer" }}
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <LocationOnOutlinedIcon sx={{ color: "#333333" }} />
            <Typography
              sx={{ fontSize: "1rem", fontWeight: "500", color: "#333333" }}
            >
              {selectedCity || "City"}
            </Typography>
            <ExpandMoreIcon sx={{ color: "#333333" }} />
          </Box>

          {showDropdown && (
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "200px",
                bgcolor: "white",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                mt: 1,
                zIndex: 10,
                padding: "10px",
              }}
            >
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search city"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Stack sx={{ mt: 1 }}>
                {city 
                  .filter((city) =>
                    city.city_name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((city, index) => (
                    <Typography
                      key={index}
                      sx={{
                        padding: "8px",
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#f0f0f0" },
                      }}
                      onClick={() => {
                        setSelectedCity(city.city_name);
                        setSelectedCityId(city.id);
                         dispatch(selectCity(city.city_name));
                        setShowDropdown(false);
                      }}
                    >
                      {city.city_name}
                    </Typography>
                  ))}
              </Stack>
            </Box>
          )}
        </Box>
      </ClickAwayListener>
    </div>
  );
};

export default SearchBar;
