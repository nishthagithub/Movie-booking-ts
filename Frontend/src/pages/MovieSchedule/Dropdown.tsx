import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import {
  searchTheater,
  filterByChain,
  sortByPrice,
  sortByAlphabetical,
  setTheater,
} from "../../store/features/TheaterSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import axios from "axios";
import { fetchTheatersSortedAlphabetically, fetchTheatersSortedByPrice } from "../../store/features/FilterSlice";
 type Props = {
   onSortChange?: (order: "asc" | "desc") => void;
 };
const DropdownWithSearch = ({ onSortChange }: Props) => {
  const [selectedValues, setSelectedValues] = useState<{
    Studio: string;
    Sort1: string;
    Price: string;
  }>({
    Studio: "",
    Sort1: "",
    Price: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const { selectedCity, searchQuery, filteredTheaters } = useSelector(
    (state: RootState) => state.theater
  );
  const selectedMovie = useSelector(
    (state: RootState) => state.movie.selectedMovie
  );
  const theater_type = useSelector((state: any) => state.theater.selectedChain);
  const day = useSelector((state: any) => state.theater.selectedDay);
 

  // Handle Dropdown Change
  const handleChange =
    (label: keyof typeof selectedValues) =>
    (event: SelectChangeEvent<string>) => {
      const value = event.target.value;
      setSelectedValues((prev) => ({ ...prev, [label]: value }));

      switch (label) {
        case "Studio":
          dispatch(filterByChain(value));

          break;
        case "Sort1":
          if (value && value === "Ascending") {
            dispatch(sortByAlphabetical());
          }
          break;

        case "Price":
          if (value === "Lowest" || value === "Highest")
            dispatch(fetchTheatersSortedByPrice(value));
          break;
        default:
          break;
      }
    };

  const dropdowns: { label: keyof typeof selectedValues; options: string[] }[] =
    [
      { label: "Studio", options: ["XXI", "CGV", "Cinepolis"] },
      { label: "Sort1", options: ["Ascending"] },
      { label: "Price", options: ["Lowest", "Highest"] },
    ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Search Bar */}
      <Box
        sx={{
          width: "320px",
          border: "1px solid #5A637A",
          display: "flex",
          alignItems: "center",
          paddingX: "12px",
          borderRadius: "6px",
        }}
      >
        <TextField
          value={searchQuery}
          onChange={(e) => dispatch(searchTheater(e.target.value))}
          placeholder="Search theaters..."
          variant="standard"
          fullWidth
          InputProps={{ disableUnderline: true, sx: { color: "#333333" } }}
        />
        <SearchIcon sx={{ color: "#333333" }} />
      </Box>

      {/* Dropdowns */}
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        {dropdowns.map((dropdown) => (
          <FormControl
            key={dropdown.label}
            variant="standard"
            sx={{ minWidth: 82 }}
          >
            <InputLabel>{dropdown.label}</InputLabel>
            <Select
              value={selectedValues[dropdown.label] || ""}
              onChange={handleChange(dropdown.label)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {dropdown.options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
      </Box>
    </Box>
  );
};

export default DropdownWithSearch;
