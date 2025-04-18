import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import dotenv from "dotenv"

import {
  Container,
  Typography,
  Box,
  Divider,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { RootState } from "../../store/store";
import PaymeentModal from "../../Modals/PaymeentModal";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
const Payment = () => {
  const [open, setOpen] = useState(false);
 
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = today.toLocaleString("en-US", { month: "short" }); // 'Apr'
    return `${day}, ${month}`;
  };
  const selectedMovie = useSelector((state: RootState) => state.movie.selectedMovie);
  // console.log(selectedMovie)
  const { format, time,date } = useSelector((state: RootState) => state.slot);
  const { selectedSlots } = useSelector(
      (state: RootState) => state.slot
    );
    
// console.log(selectedSlots)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!);
// console.log(process.env.REACT_APP_STRIPE_KEY);
  return (
    <div>
      <Container
        sx={{ marginLeft: { xs: "1rem", md: "3rem" }, marginTop: "2rem" }}
      >
        <Typography
          sx={{
            color: "#333333",
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
            fontWeight: 700,
          }}
        >
          PAYMENT CONFIRMATION
        </Typography>
        <Typography
          sx={{
            color: "#5A637A",
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: "24px",
          }}
        >
          Confirm the payment for the seats you have booked.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 5, sm: 7, md: 17 },
            flexDirection: { xs: "column", sm: "row", md: "row" },
            alignItems: "start",
          }}
        >
          <Box sx={{ width: "421px", height: "405px" }}>
            <Typography
              sx={{
                marginTop: { xs: "2rem", md: "5rem" },
                fontSize: "1.5rem",
                color: "#333333",
                fontWeight: 500,
              }}
            >
              Schedule Details
            </Typography>
            <Box
              sx={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  color: "#414A63",
                  fontSize: "1rem",
                  lineHeight: 1.2,
                  fontWeight: 400,
                }}
              >
                Movie Title
              </Typography>
              <Typography
                sx={{
                  color: "#333333",
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                }}
              >
                {selectedMovie?.movie_title}
              </Typography>
            </Box>
            <Divider
              sx={{
                width: "100%",
                border: "1px solid #DADFE8",
                marginTop: "0.5rem",
              }}
            />

            <Box
              sx={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  color: "#414A63",
                  fontSize: "1rem",
                  lineHeight: 1.2,
                  fontWeight: 400,
                }}
              >
                Date
              </Typography>
              <Typography
                sx={{
                  color: "#333333",
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                }}
              >
                {!date || date.trim() === "" ? getCurrentDate() : date}{" "}
              </Typography>
            </Box>
            <Divider
              sx={{
                width: "100%",
                border: "1px solid #DADFE8",
                marginTop: "0.5rem",
              }}
            />

            {/* Class and Time side by side */}
            <Box
              sx={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: { xs: 15, md: 5 },
              }}
            >
              <Box>
                <Typography
                  sx={{ color: "#414A63", fontSize: "1rem", fontWeight: 400 }}
                >
                  Class
                </Typography>
                <Typography
                  sx={{
                    color: "#333333",
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                  }}
                >
                  {format}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{ color: "#414A63", fontSize: "1rem", fontWeight: 400 }}
                >
                  Time
                </Typography>
                <Typography
                  sx={{
                    color: "#333333",
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                  }}
                >
                  {time}
                </Typography>
              </Box>
            </Box>
            <Divider
              sx={{
                width: "100%",
                border: "1px solid #DADFE8",
                marginTop: "0.5rem",
              }}
            />

            {/* Ticket Information */}
            <Box
              sx={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  color: "#414A63",
                  fontSize: "1rem",
                  lineHeight: 1.2,
                  fontWeight: 400,
                }}
              >
                Tickets
              </Typography>
              <Typography
                sx={{
                  color: "#333333",
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                }}
              >
                {selectedSlots.map((seat) => seat.seat).join(", ")}
              </Typography>
            </Box>
            <Divider
              sx={{
                width: "100%",
                border: "1px solid #DADFE8",
                marginTop: "0.5rem",
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                marginTop: "1rem",
                color: "#5A637A",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                }}
                onClick={() => setOpen(true)}
              >
                <ArrowBackIcon
                  sx={{
                    width: { md: "32px" },
                    height: "32px",
                    borderRadius: "4px",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.5rem" },
                    fontWeight: 700,
                  }}
                >
                  Back
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* box order summary */}
          <Elements stripe={stripePromise}>
            <PaymeentModal />
          </Elements>
        </Box>
      </Container>
      {/* pop up message */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: { xs: "350px", sm: "500px", md: "614px" },
            height: "199px",
            backgroundColor: "white",
            borderRadius: "8px",
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "start",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            p: 3,
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ fontSize: "1.2rem", fontWeight: 600, textAlign: "start" }}
          >
            Want to go back?
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              color: "#5A637A",
              textAlign: "start",
              mt: 1,
            }}
          >
            The seats you previously selected will be canceled, and you will
            need to reselect them.
          </Typography>
          <Box
            sx={{ display: "flex", gap: 2, mt: 3, justifyContent: "flex-end" }}
          >
            <Button
              component={Link}
              to="/seat-selection"
              onClick={() => setOpen(false)}
              variant="outlined"
              sx={{ minWidth: "100px" }}
            >
              Go Back
            </Button>
            <Button
              component={Link}
              to="/choose-payment"
              onClick={() => setOpen(false)}
              variant="contained"
              color="primary"
              sx={{ minWidth: "100px" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Payment;
