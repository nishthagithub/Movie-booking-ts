import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateDates } from "../../pages/MovieSchedule/DateSlots";

interface Seat {
    id:number;
    seat: string;
    price: number;
}
interface SeatLayout {
  id:number;
    seat_number: string;
    isBooked: boolean;
}

interface SlotState {
  selectedSlots: Seat[];
  slotTypeId: number | null; // Correctly typed array
  slot: string;
  format: string;
  location: string;
  theaterName: string;
  price: number;
  totalAmount: number;
  time: string;
  date: string;
  currentMovieId: number | null;
  seatLayout: SeatLayout[];
  mappedSlots: string[];
  hasCompletedPayment: boolean;
  bookingInProgress: boolean;
}

const initialState: SlotState = {
  selectedSlots: [],
  slotTypeId: null,
  slot: "",
  format: "",
  location: "",
  theaterName: "",
  price: 0,
  totalAmount: 0,
  time: "",
  currentMovieId: null,
  date: generateDates()[0]?.date || "",
  seatLayout: [],
  mappedSlots: [],
  hasCompletedPayment: false,
  bookingInProgress: false,
};
// console.log("Generated Dates:", generateDates());

const slotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {
    selectSlot: (
      state,
      action: PayloadAction<{
        id: number;
        slotId: number;
        slot: string;
        format: string;
        location: string;
        theaterName: string;
        time: string;
        price: number;
        date: string;
      }>
    ) => {
      const {
        id,
        slotId,
        slot,
        format,
        location,
        theaterName,
        time,
        price,
        date,
      } = action.payload;
      state.slotTypeId = slotId;
      state.slot = slot;
      state.format = format;
      state.location = location;
      state.theaterName = theaterName;
      state.time = time;
      state.price = price;
      state.date = date;
      state.currentMovieId = id;
      state.selectedSlots = [];
      state.totalAmount = 0;
      state.seatLayout = [];
    },
    setSeatLayouts: (state, action: PayloadAction<SeatLayout[]>) => {
      state.seatLayout = action.payload;
    },
    setSlotTypeId: (state, action) => {
      const { slot_id, time } = action.payload;
      state.slotTypeId = slot_id;
      state.time = time;

      const parsedSlot =
        typeof state.slot === "string" ? JSON.parse(state.slot) : state.slot;

      const matchingSlot = parsedSlot?.slots?.find((slot: any) =>
        slot.slot_times.some((st: any) => st.slot_id === slot_id)
      );

      if (matchingSlot) {
        const slotIds = matchingSlot.slot_times.map((st: any) => st.slot_id);
        state.mappedSlots = slotIds;
      } else {
        state.mappedSlots = [];
      }
    },
    setMappedSlots: (state, action: PayloadAction<string[]>) => {
      state.mappedSlots = action.payload;
    },
    setBookingInProgress: (state, action: PayloadAction<boolean>) => {
      state.bookingInProgress = action.payload;
    },
    setHasCompletedPayment: (state, action: PayloadAction<boolean>) => {
      state.hasCompletedPayment = action.payload;
    },

    deselectSlot: (state, action: PayloadAction<string>) => {
      state.selectedSlots = state.selectedSlots.filter(
        (seat) => seat.seat !== action.payload
      );

      state.totalAmount = state.selectedSlots.reduce(
        (sum, seat) => sum + seat.price,
        0
      );
    },
    resetSlot: (state) => {
      state.selectedSlots = [];
      state.slot = "";
      state.format = "";
      state.location = "";
      state.theaterName = "";
      state.price = 0;
      state.totalAmount = 0;
      state.time = "";
      state.seatLayout = [];
      state.slotTypeId = null;
      state.currentMovieId = null;
      state.hasCompletedPayment=false;
    },
    selectSeat: (
      state,
      action: PayloadAction<{
        id: number;
        seat: string;
        price: number;
      }>
    ) => {
      const { seat, price, id } = action.payload;

      const alreadySelected = state.selectedSlots.find((s) => s.seat === seat);

      if (!alreadySelected) {
        if (state.selectedSlots.length >= 5) {
          state.selectedSlots.shift(); // Optional: remove oldest seat if over limit
        }

        state.selectedSlots.push({ id, seat, price });

        state.totalAmount = state.selectedSlots.reduce(
          (sum, s) => sum + s.price,
          0
        );
      }
    },

    deselectSeat: (state, action: PayloadAction<string>) => {
      state.selectedSlots = state.selectedSlots.filter(
        (seat) => seat.seat !== action.payload
      );
      state.totalAmount = state.selectedSlots.reduce(
        (sum, seat) => sum + seat.price,
        0
      );
    },
    resetData: (state) => {
      state.selectedSlots = [];
      state.totalAmount = 0;
    },
  },
});

export const {
  selectSlot,
  deselectSlot,
  resetSlot,
  selectSeat,
  deselectSeat,
  setMappedSlots,
  resetData,
  setSeatLayouts,
  setBookingInProgress,
  setHasCompletedPayment,
  setSlotTypeId,
} = slotSlice.actions;
export default slotSlice.reducer;
