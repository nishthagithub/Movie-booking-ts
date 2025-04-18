import { useState, FC, useEffect } from "react";
import {
  Typography,
  Box,
  Divider,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import ASSETS from "../Assets";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { setBookingInProgress, setHasCompletedPayment } from "../store/features/SlotSlice";
const PaymeentModal = () => {
   const getCurrentDate = () => {
     const today = new Date();
     const day = String(today.getDate()).padStart(2, "0");
     const month = today.toLocaleString("en-US", { month: "short" }); // 'Apr'
     return `${day}, ${month}`;
   };
  const { format,  price, selectedSlots,date } = useSelector(
    (state: RootState) => state.slot
  );
  const finalDate = date && date.trim() !== "" ? date : getCurrentDate();
  
  const slotId = useSelector((state: RootState) => state.slot.slotTypeId);
  const [navigated, setNavigated] = useState(false);
  
  const totalPayment =
    selectedSlots.reduce((acc, seat) => acc + (seat.price || 500), 0) +
    300 * selectedSlots.length -
    70;
  const [openModal2, setOpen2] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const defaultPayment = { name: "Dana", icon: ASSETS.images.PAYLOGO1 };

  const [selectedPayment, setSelectedPayment] = useState<{
    name: string;
    icon: string;
  }>(defaultPayment);
  const [loading, setLoading] = useState(false);
    const API_URL = process.env.REACT_APP_URL;

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const handlePayment = async (cardholderName:string) => {
    if (!stripe || !elements) return;
     dispatch(setBookingInProgress(true));
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/api/stripe/create-payment`,
        {
          amount: totalPayment, // amount in paise
          currency: "inr",
        }
      );
      const clientSecret = res.data.clientSecret;
      const bookingId = res.data.bookingId;
      console.log(bookingId)
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: cardholderName,
          },
        },
      });
      if (result.error) {
        console.error("Payment error:", result.error.message);
        alert("Payment failed: " + result.error.message);
        
        dispatch(setBookingInProgress(false));
        setLoading(false);
      } else if (result.paymentIntent?.status === "succeeded") {
        await seatBooking();
        await bookingData(bookingId);
        dispatch(setHasCompletedPayment(true));
        console.log("Booking ID before navigate:", bookingId);
        setNavigated(true);
        navigate(`/success-page/${bookingId}`);
         if (navigated) {
           dispatch(setBookingInProgress(false));
         }
     }
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Something went wrong.");
       dispatch(setBookingInProgress(false));
    } finally {
      setLoading(false);
    }
  };

     const seatBooking = async () => {
       try {
        const seatIds = selectedSlots.map((seat) => seat.id);

         const response = await axios.post(
           `${API_URL}/api/seats/seat/book`,
           {
             seatIds: seatIds,
           }
         );
         alert("Ticket Booked Successfully")
         console.log("Seat booked successfully:", response.data);
       } catch (error) {
         console.error("Error booking seat:", error);
       }
     };
  

 const userId= localStorage.getItem("userId");
const movieId = useSelector(
  (state: RootState) => state.movie.selectedMovie?.movie_id
);

const bookingData = async (bookingId: string) => {
  try {
    const seatIds = selectedSlots.map((seat) => seat.id);
    const response = await axios.post(`${API_URL}/api/cpay/pay`, {
      userId: userId,
      movieId: movieId,
      seatId: seatIds,
      slotId: slotId,
      selectedSeats: selectedSlots,
      bookingId: bookingId,
      payment_status: true,
    });
    console.log("Booking successful:", response.data);
  } catch (error) {
    console.error("Booking failed:", error);
    
  }
};


  return (
    <div>
      <Box
        sx={{
          width: { xs: "350px", md: "499px" },
          height: { xs: "auto", md: "730px" },
          border: "1px solid #C4C4C4",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          padding: 4,
          borderRadius: "12px",
          marginTop: "3rem",
          margin: "auto",
        }}
      >
        <Typography
          sx={{
            color: "#333333",
            fontSize: "1.5rem",
            fontWeight: 500,
            lineHeight: "28.13px",
          }}
        >
          Order Summary
        </Typography>
        <Typography
          sx={{
            marginTop: "1.5rem",
            color: "#333333",
            fontSize: "1rem",
            fontWeight: 700,
            lineHeight: "18.75px",
          }}
        >
          Transaction Details{" "}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#333333",
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: "18.75px",
            marginTop: "0.5rem",
          }}
        >
          <Typography>{format}</Typography>
          <Typography>
            {price}{" "}
            <span
              style={{
                color: "#414A63",
                fontSize: "1rem",
                fontWeight: 700,
                lineHeight: "18.75px",
              }}
            >
              x{selectedSlots.length}
            </span>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#333333",
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: "18.75px",
            marginTop: "0.5rem",
          }}
        >
          <Typography sx={{}}>Service Fees</Typography>
          <Typography>
            Rs.300{" "}
            <span
              style={{
                color: "#414A63",
                fontSize: "1rem",
                fontWeight: 700,
                lineHeight: "18.75px",
              }}
            >
              {" "}
              x{selectedSlots.length}
            </span>
          </Typography>
        </Box>

        <Divider sx={{ marginTop: "1.5rem", border: "1px solid #BDC5D4" }} />
        <Typography
          sx={{
            marginTop: "1.5rem",
            color: "#333333",
            fontSize: "1rem",
            fontWeight: 700,
            lineHeight: "18.75px",
          }}
        >
          Promo & Voucher{" "}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#333333",
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: "18.75px",
            marginTop: "0.5rem",
          }}
        >
          <Typography sx={{}}>PROMO TIX ID</Typography>
          <Typography>- Rs 70</Typography>
        </Box>
        <Divider sx={{ marginTop: "1.5rem", border: "1px solid #BDC5D4" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#333333",
            fontSize: "1rem",
            fontWeight: 700,
            lineHeight: "18.75px",
            marginTop: "1rem",
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>Total Payment</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            Rs {totalPayment.toLocaleString("en-IN")}
          </Typography>
        </Box>
        <Divider sx={{ marginTop: "1rem", border: "1px solid #BDC5D4" }} />
        
        <Typography
          style={{
            color: "#FF6B6B",
            fontSize: "12px",
            fontWeight: 400,
            marginTop: "1.2rem",
          }}
        >
          *Ticket purchases cannot be canceled.
        </Typography>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "16px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            width: { xs: "280px", md: "419px" },
            margin: "auto",
            marginTop: "1rem",
          }}
        >
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="Cardholder Name"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginBottom: "16px",
              fontSize: "16px",
            }}
          />
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1A2C50",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                },
              },
              hidePostalCode: true,
            }}
          />
        </Box>

        <Button
          sx={{
            bgcolor: "#1A2C50",
            color: "#FFBE00",
            width: { xs: "280px", md: "419px" },
            padding: "12px 16px",
            marginTop: "1.5rem",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "16px",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "#2B3E66",
            },
            "&:disabled": {
              bgcolor: "#ccc",
              color: "#666",
            },
          }}
          onClick={() => handlePayment(cardholderName)}
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay & Confirm"}
        </Button>
      </Box>
      
    </div>
  );
};

export default PaymeentModal;
