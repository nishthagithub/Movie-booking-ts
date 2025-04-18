import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  keywords: string;
}

interface NewsState {
  selectedCategory: string;
  searchQuery: string;
  newsData: NewsItem[];
  loading: boolean;
  error: string | null;
}

const initialState:NewsState = {
  selectedCategory: "spotlight",
  searchQuery: "",
  newsData: [], // 🆕 This holds the fetched news
  loading: false,
  error: null,
};
  const API_URL = process.env.REACT_APP_URL;

export const fetchNews = createAsyncThunk<NewsItem[], void, { rejectValue: string }>(
  "news/fetchNews",
  async (__dirname, thunkAPI) => {
    try {
      const respone = await axios.get(`${API_URL}/api/news/`);
      return respone.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch news"
      );
    }
  }
);
const newsSlice  = createSlice({
    name:"news",
    initialState,
    reducers:{
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
          },
          setSearch: (state,action) => {
            state.searchQuery = action.payload 
          }
    },
    extraReducers: (builder) => {
       builder.addCase(fetchNews.pending, (state) => {
         state.loading = true;
         state.error = null;
       })
        .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.newsData = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    }
})
export const { setCategory,setSearch } = newsSlice.actions;
export default newsSlice.reducer;