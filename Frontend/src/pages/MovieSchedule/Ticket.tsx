import React from 'react'
import { Box,Typography,Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'

const Ticket = () => {
  const navigate = useNavigate();
const handleBuyNow = () => {
  const authStatus = localStorage.getItem("isAuthenticated") === "true";
  console.log("Auth status:", authStatus);
  if (authStatus) {
    navigate("/seat-selection");
  } else {
    navigate("/login");
  }
};

 const {  format, location, theaterName,time,date } = useSelector(
   (state: RootState) => state.slot
 );
 const getCurrentDate = () => {
   const today = new Date();
   const day = String(today.getDate()).padStart(2, "0");
   const month = today.toLocaleString("en-US", { month: "short" }); 
   return `${day} ${month}`;
 };


  return (
    <div>
      {theaterName && (
        <Box
          sx={{
            width: { xs: "320px", md: "418px" },
            height: { xs: "380px", md: "333px" },
            border: "1px solid #5A637A",
            padding: "1.5rem",
            borderRadius: "12px",
            marginTop: "2rem",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "1.7rem",
                fontWeight: "700",
              }}
            >
              {theaterName}
            </Typography>
            <p
              style={{
                color: "#5A637A",
                fontSize: "1.1rem",
                paddingTop: "1rem",
              }}
            >
              {location},{!date || date.trim() === "" ? getCurrentDate() : date}
            </p>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  color: "#333333",
                  fontSize: "1.2rem",
                  fontWeight: "500",
                }}
              >
                {format}
              </Typography>
              <Typography
                sx={{
                  color: "#333333",
                  fontSize: "1.2rem",
                  fontWeight: "500",
                }}
              >
                {time}
              </Typography>
            </Typography>
            <p
              style={{
                color: "#9DA8BE",
                fontWeight: "400",
                marginTop: "1rem",
              }}
            >
              * Seat selection can be done after this.
            </p>

            <Button
              onClick={handleBuyNow}
              sx={{
                width: { xs: "250px", md: "368px" },
                height: { xs: "40px", md: "64px" },
                bgcolor: "#1A2C50",
                color: "#FFBE00",
                textAlign: "center",
                fontSize: "1.2rem",
                fontWeight: "500",
              }}
            >
              Buy Now
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
}

export default Ticket

