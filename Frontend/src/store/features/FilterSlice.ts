import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface SortParams {
  movie_id: number;
  day_id: number;
  city_id: number;
  order: "asc" | "desc";
}
type FilterParams = {
  city_id: number;
  movie_id: number;
  day_id: number;
};
  const API_URL = process.env.REACT_APP_URL;

export const fetchTheatersSortedByPrice = createAsyncThunk(
  "theaters/fetchSortedByPrice",
  async (order: "Lowest" | "Highest", thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/theater/price?order=${order.toLowerCase()}`
      );
      return response.data.data; // Extract only the sorted data
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to sort theaters by price");
    }
  }
);
export const fetchTheatersSortedAlphabetically = createAsyncThunk(
  "theaters/fetchSortedAlphabetically",
  async (params: SortParams, thunkAPI) => {
    const { movie_id, day_id, city_id, order } = params;

    try {
      const response = await axios.get(
        `${API_URL}/api/theater/sorting-theater`,
        {
          params: {
            movie_id,
            day_id,
            city_id,
            order,
          },
        }
      );

      return response.data.data; // Adjust if your API structure differs
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to sort theaters alphabetically");
    }
  }
);

export const fetchFilteredTheatersAlphabletically = createAsyncThunk(
  "theaters/fetchFiltered",
  async ({ city_id, movie_id, day_id }: FilterParams, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/api/theater/sortbytype`, {
        params: {
          city_id,
          movie_id,
          day_id,
          
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to sort theaters alphabetically");
    }
  }
);