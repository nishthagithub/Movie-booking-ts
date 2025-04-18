import { createSlice } from "@reduxjs/toolkit";
interface MovieState {
    selectedMovie: Movie | null;
    previousMovieId: number | null;
  }
  
  const initialState: MovieState = {
    selectedMovie: null,
    previousMovieId:null
  };
 interface Movie {
   movie_id: number;
   movie_title: string;
   movie_duration: string;
   movie_director: string;
   movie_genere: string;
   movie_poster: string;
   movie_rating?: string;
 }

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        selectMovie: (state, action) => {
            state.selectedMovie = action.payload;
            console.log(state.selectedMovie);
        },
        resetMovie:(state)=>{
          state.selectedMovie=null;
        }
      
    }
});
export const {selectMovie,resetMovie} = movieSlice.actions;
export default movieSlice.reducer;