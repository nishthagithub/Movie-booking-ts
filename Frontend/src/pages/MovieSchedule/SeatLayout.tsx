import React, { useState, useRef, useEffect } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { selectSeat, deselectSeat, setSeatLayouts, setBookingInProgress } from "../../store/features/SlotSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
const columns = 20;
const rows = 8;
type SlotType = {
  // Add properties of slotType if known
  id: number;
  name: string;
};

type Slot = {
  id: number;
  slot_time: string;
  slotType: SlotType;
};

type Seat = {
  id: number;
  seat_number: string;
  isBooked: boolean;
  slot: Slot;
};


const SeatLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedSlots, totalAmount, price } = useSelector(
    (state: RootState) => state.slot
  );
  const handleConfirm = () => {
    dispatch(setBookingInProgress(true))
    navigate("/choose-payment");
  };

 const seatLayouted = useSelector((state: RootState) => state.slot.seatLayout);
//  console.log(seatLayouted)
//  console.log(seatLayouted)
const [seatLayout, setSeatLayout] = useState <Seat[][]>([]);

const slotId = useSelector((state: RootState) => state.slot.slotTypeId);
// console.log(slotId)
  useEffect(() => {
    if (!slotId) {
      
      navigate("/");
    } else {
      fetchSeatLayout(slotId); // fetch seat layout for selected slot
    }
  }, [slotId]);
    const API_URL = process.env.REACT_APP_URL;

const fetchSeatLayout = async (slotId: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/seats/all-seats/${slotId}`
    );
    const layout = response.data
    
    dispatch(setSeatLayouts(layout))
     setSeatLayout(response.data);
  } catch (error) {
    console.error("Error fetching seat layout:", error);
  }
};
const flatSeatLayout = seatLayout.flat();
  const handleSeatSelection = (seatNumber: string) => {
    const seatPrice = price || 250;

    // Find the seat from the layout to get ID and ensure it exists
   const selectedSeat = flatSeatLayout.find(
     (s) => s.seat_number === seatNumber
   );
    if (selectedSeat?.isBooked) return;

    const seatId = selectedSeat?.id ?? Math.floor(Math.random() * 100000);

    const isAlreadySelected = selectedSlots.some(
      (seat) => seat.seat === seatNumber
    );

    if (isAlreadySelected) {
      dispatch(deselectSeat(seatNumber));
    } else {
      if (selectedSlots.length >= 5) {
        const firstSeat = selectedSlots[0];
        dispatch(deselectSeat(firstSeat.seat));
      }
      dispatch(selectSeat({ id: seatId, seat: seatNumber, price: seatPrice }));
    }
  };

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1096px",
          height: "372px",
          margin: "auto",
          whiteSpace: "nowrap",
          display: "grid",
          gridTemplateColumns: `repeat(20, 1fr)`, // 20 columns
          gap: { xs: "5px", md: "10px" },
          padding: "4px 16px",
          borderRadius: "8px",
        }}
      >
        {seatLayouted.flat().map((seat) => {
          const seatNumber = seat.seat_number;
          const isBooked = seat.isBooked;
          const isSelected = selectedSlots.some((s) => s.seat === seatNumber);

          return (
            <Box
              key={seat.id}
              onClick={() => {
                if (!isBooked) handleSeatSelection(seatNumber);
              }}
              sx={{
                width: { xs: "35px", md: "40px" },
                height: { xs: "26px", md: "36px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: isBooked
                  ? "#1A2C50"
                  : isSelected
                  ? "#118EEA"
                  : "white",
                color: isBooked || isSelected ? "white" : "#333",
                cursor: isBooked ? "not-allowed" : "pointer",
                borderRadius: "4px",
                fontSize: { xs: "10px", md: "12px" },
                border: "1px solid ",
                borderColor: "grey.500",
                fontWeight: "bold",
                userSelect: "none",
                "&:hover": {
                  bgcolor: isBooked ? "#1A2C50" : "#118EEA",
                  color: "white",
                },
              }}
            >
              {seatNumber}
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "60px",
          bgcolor: "#118EEA",
          marginTop: "2rem",
          fontWeight: "700",
          fontSize: "1.5rem",
          color: "#F2E8E8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Cinema Screen Here
      </Box>

      <Box
        sx={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { md: "space-evenly" },
          alignItems: { xs: "center", md: "center" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { xs: 3, md: 15 },
            flexDirection: "row",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{ color: "#5A637A", fontSize: "1.2rem", fontWeight: 500 }}
            >
              Total
            </Typography>
            <Typography
              sx={{
                color: "#333333",
                fontSize: { xs: "1.2rem", md: "2rem" },
                fontWeight: 700,
              }}
            >
              {totalAmount}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{ color: "#5A637A", fontSize: "1.2rem", fontWeight: 500 }}
            >
              Seats
            </Typography>
            <Typography
              sx={{
                color: "#333333",
                fontSize: { xs: "1.2rem", md: "2rem" },
                fontWeight: 700,
              }}
            >
              {selectedSlots.map((seat) => seat.seat).join(", ")}
            </Typography>
          </Box>
        </Box>
        {selectedSlots.length > 0 && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Typography
              sx={{
                marginTop: "1rem",
                border: "1px solid #5A637A",
                width: { xs: "100px", sm: "150px", md: "199px" },
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
              }}
            >
              <Link to="/movie-schedule">
                <Button sx={{ color: "#5A637A" }}>Back</Button>
              </Link>
            </Typography>

            <Typography
              sx={{
                marginTop: "1rem",
                bgcolor: "#1A2C50",
                border: "1px solid #5A637A",
                width: { xs: "100px", sm: "150px", md: "199px" },
                height: "48px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              <Button onClick={handleConfirm} sx={{ color: "#FFBE00" }}>
                Confirm
              </Button>
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default SeatLayout;
