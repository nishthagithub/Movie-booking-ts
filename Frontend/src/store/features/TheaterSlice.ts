import { createSlice, PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  fetchFilteredTheatersAlphabletically,
  fetchTheatersSortedAlphabetically,
  fetchTheatersSortedByPrice,
} from "./FilterSlice";

interface Slot {
  slotType: {
    type_name: string;
    price: number;
  };
  slot_times: string[];
}

interface Theater {
  theater_name: string;
  theater_type: string; // Chain like Cinepolis, CGV, etc.
  theater_address: string;
  slots: Slot[];
}

interface City {
  city_name: string;
  theaters: Theater[];
}

interface InitialState {
  selectedCity: string;
  searchQuery: string;
  selectedChain: string;
  priceSortOrder: string;
  isLoading: boolean;
  citiesData: City[];
  filteredTheaters: Theater[];
  allSlots: Slot[];
  allTheaters: Theater[];
  isFilteredd: boolean; 
}
  const API_URL = process.env.REACT_APP_URL;


export const fetchAllSlots =createAsyncThunk("theater/fecth",async()=>{
  const response = await axios.get(`${API_URL}/api/slot`);
  
  return response.data;
});

export const fetchTheaters = createAsyncThunk(
  "theater/fetchTheaters",
  async ({theater_type, city_id, day_id, movie_id}:{
    theater_type: string;
    city_id: number;
    day_id: number;
    movie_id: number;
  }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/theater/filterByChain`,
        {
          params: {
            theater_type,
            city_id,
            day_id,
            movie_id,
          },
        }
      );
      console.log("fil", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching theaters:", error);
      console.log(error);
    }
  }
);

const initialState: InitialState = {
  selectedCity: "Surat",
  searchQuery: "",
  selectedChain: "",
  priceSortOrder: "",
  citiesData: [],
  filteredTheaters: [],
  allSlots: [],
  allTheaters: [],
  isFilteredd: false,
  isLoading:false
};

const theaterSlice = createSlice({
  name: "theater",
  initialState,
  reducers: {
    setTheater: (state, action: PayloadAction<Theater[]>) => {
      console.log("Setting all theaters:", action.payload);
      state.allTheaters = action.payload;
      state.filteredTheaters = action.payload;
    },

    selectCity: (state, action: PayloadAction<string>) => {
      console.log("City selected:", action.payload);
      state.selectedCity = action.payload;

      state.filteredTheaters = action.payload
        ? state.citiesData.find((city) => city.city_name === action.payload)
            ?.theaters || []
        : state.allTheaters;
      // Add this
    },

    searchTheater: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase();
      state.searchQuery = query;

      // Just filter from allTheaters regardless of city
      state.filteredTheaters = state.allTheaters.filter((theater) =>
        theater.theater_name.toLowerCase().includes(query)
      );

      console.log("Search Query:", query);
      console.log(
        "All Theaters (cloned):",
        JSON.parse(JSON.stringify(state.allTheaters))
      );

      console.log("Filtered:", state.filteredTheaters);
    },

    filterByChain: (state, action: PayloadAction<string>) => {
      const chain = action.payload;
      console.log("Filtering by chain:", chain);
      const normalizedChain = chain.toLowerCase();
      const normalizedSearchQuery = state.searchQuery.toLowerCase();

      state.selectedChain = chain;

      // Get base list from city or all
      const baseTheaters = state.selectedCity
        ? state.citiesData.find((city) => city.city_name === state.selectedCity)
            ?.theaters || []
        : state.allTheaters;

      // Filter by chain
      state.filteredTheaters = baseTheaters.filter((theater) => {
        const theaterTypeNormalized = theater.theater_type.toLowerCase();
        const theaterNameNormalized = theater.theater_name.toLowerCase();

        return (
          theaterTypeNormalized.includes(normalizedChain) &&
          theaterNameNormalized.includes(normalizedSearchQuery)
        );
      });
      if (state.filteredTheaters.length === 0) {
        console.log("No theaters found.");
        state.isFilteredd = true; // Set a state flag to handle this case in your UI
      } else {
        // Reset the flag if theaters are found
        state.isFilteredd = false;
      }

      console.log(
        "Filtered Theaters After Chain Selection:",
        state.filteredTheaters
      );
      console.log("All Theaters Before Filtering:", baseTheaters);
    },

    sortByPrice: (state, action: PayloadAction<string>) => {
      console.log("Sorting by price:", action.payload);

      state.priceSortOrder = action.payload;

      const getLowestPrice = (theater: Theater): number => {
        if (!theater.slots.length) return Infinity;
        return Math.min(...theater.slots.map((slot) => slot.slotType.price));
      };

      state.filteredTheaters = [...state.filteredTheaters].sort((a, b) => {
        const priceA = getLowestPrice(a);
        const priceB = getLowestPrice(b);
        return action.payload === "Lowest" ? priceA - priceB : priceB - priceA;
      });
      console.log("Filtered Theaters After Sorting:", state.filteredTheaters);
    },
    sortByAlphabetical: (state) => {
   if (!state.allTheaters || state.allTheaters.length === 0) {
     console.log("No theaters to sort.");
     return;
   }

   state.allTheaters.sort((a, b) =>
     a.theater_name.localeCompare(b.theater_name)
   );
   console.log(
     "Filtered Theaters After Alphabetical Sorting:",
     state.allTheaters
   );

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSlots.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchAllSlots.fulfilled,
        (state, action: PayloadAction<Slot[]>) => {
          state.isLoading = false;
          state.allSlots = action.payload;
        }
      )
      .addCase(fetchTheaters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchTheaters.fulfilled,
        (state, action: PayloadAction<Theater[]>) => {
          state.isLoading = false;
          state.allTheaters = action.payload;
          console.log("Fetched theaters:", action.payload);
        }
      )
      .addCase(fetchTheatersSortedByPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchTheatersSortedByPrice.fulfilled,
        (state, action: PayloadAction<Theater[]>) => {
          state.isLoading = false;
          state.filteredTheaters = action.payload;
          state.allTheaters = action.payload; // optionally update this too
        }
      )
      .addCase(fetchTheatersSortedAlphabetically.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchTheatersSortedAlphabetically.fulfilled,
        (state, action: PayloadAction<Theater[]>) => {
          state.isLoading = false;
          state.filteredTheaters = action.payload;

          state.allTheaters = action.payload;
        }
      )
      .addCase(fetchFilteredTheatersAlphabletically.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchFilteredTheatersAlphabletically.fulfilled,
        (state, action) => {
          state.isLoading = false;
           state.allTheaters = action.payload;
          console.log("Fetched theaters:", action.payload);
        }
      );
  },
});

export const {
  selectCity,
  searchTheater,
  setTheater,
  filterByChain,
  sortByPrice,
  sortByAlphabetical
} = theaterSlice.actions;
export default theaterSlice.reducer;
