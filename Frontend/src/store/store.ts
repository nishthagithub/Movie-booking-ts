import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import movieReducer from "./features/moveSlice";
import slotReducer from "./features/SlotSlice";
import theaterReducer from "./features/TheaterSlice";

import authReducer from "./features/AuthSlice";
import NewsReducer from "./features/NewsSlice";


// Load persisted state from localStorage
const persistConfig = {
  key: "slot",
  storage,
  whitelist: [
    "slot",
    "format",
    "location",
    "theaterName",
    "price",
    "time",
    "date",
    "totalAmount",
    "selectedSlots",
    "movie_title",
    "seatLayout",
    "hasCompletedPayment",
    // "hasCompletedBooking",
  ],
};
const moviePersistConfig = {
  key: "movie",
  storage,
  whitelist: ["selectedMovie"], // this must match your movieSlice key
};

const persistedSlotReducer = persistReducer(persistConfig,slotReducer);
const persistedMovieReducer = persistReducer(moviePersistConfig, movieReducer);

const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}");

const preloadedState = {
  auth: storedUserData?.isAuthenticated
    ? {
        user: storedUserData,
        token: storedUserData.token,
        isAuthenticated: true,
        loading:true
      }
    : {
        user: null,
        token: null,
        isAuthenticated: false, // Default state if no user data,
        loading:false
      },
};

const store = configureStore({
  reducer: {
    movie: persistedMovieReducer,
    theater: theaterReducer,
    slot: persistedSlotReducer,
    auth: authReducer,
    news: NewsReducer,
   
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
