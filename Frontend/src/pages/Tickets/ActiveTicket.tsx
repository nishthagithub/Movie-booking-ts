import React, { useState,useEffect } from "react";
import { Box, Typography, Button, Container, useMediaQuery, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Link, useLocation } from "react-router-dom";


import ASSETS from "../../Assets";
import axios from "axios";
const ActiveTicket = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1023px) ")
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }; window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  const handleClick = (buttonLabel: string) => setActiveButton(buttonLabel);
  const toggleMenu = () => setMenuOpen(!menuOpen);

   interface Ticket {
      movie_poster: string;
      movie_title: string;
      date: string;
      slot_time: string;
      location: string;
      slot_type: string;
      payment_status:string
    }
    const [ticketInfo, setTicketInfo] = useState<Ticket[]>([]);
     const userId = localStorage.getItem("userId");
  const API_URL = process.env.REACT_APP_URL;
   const ticketData = async () => {
     try {
       const response = await axios.get(`${API_URL}/api/cpay/${userId}`);
       setTicketInfo(response.data);
       console.log(response.data);
     } catch (error) {
       console.error("Error fetching ticket data:", error);
     }
   };
  
   useEffect(() => {
     ticketData();
   }, []);

  return (
    <div>
      {/* Sidebar Toggle Button for Mobile */}
      {isMobile && (
        <Box
          sx={{ position: "fixed", top: "55px", left: "10px", zIndex: 1200 }}
        >
          <IconButton onClick={toggleMenu}>
            <MenuIcon sx={{ fontSize: "2rem", color: "black" }} />
          </IconButton>
        </Box>
      )}
      {isTablet && (
        <Box
          sx={{ position: "fixed", top: "55px", left: "10px", zIndex: 1200 }}
        >
          <IconButton onClick={toggleMenu}>
            <MenuIcon sx={{ fontSize: "2rem", color: "black" }} />
          </IconButton>
        </Box>
      )}

      {/* Sidebar Drawer for Mobile */}
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <Box
          sx={{
            width: "250px",
            bgcolor: "#DADFE8",
            height: "100vh",
            padding: "20px",
          }}
        >
          <IconButton onClick={toggleMenu} sx={{ marginBottom: "10px" }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Link to="/active-tickets" style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color:
                    location.pathname === "/active-tickets"
                      ? "#118EEA"
                      : "black",
                  fontWeight:
                    location.pathname === "/active-tickets" ? 500 : "normal",
                }}
              >
                <ConfirmationNumberOutlinedIcon />
                <Typography variant="body1">Active Ticket</Typography>
              </Box>
            </Link>

            <Link to="/transaction" style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color:
                    location.pathname === "/transaction" ? "#118EEA" : "black",
                  fontWeight:
                    location.pathname === "/transaction" ? 500 : "normal",
                }}
              >
                <AssignmentOutlinedIcon />
                <Typography variant="body1">Transaction List</Typography>
              </Box>
            </Link>
          </Box>
        </Box>
      </Drawer>

      {/* Sidebar for Larger Screens */}
      {!isMobile && !isTablet && (
        <Box
          sx={{
            width: { md: "200px", lg: "250px" },
            minHeight: isScrolled ? "50vh" : "100vh",
            bgcolor: "#DADFE8",
            textAlign: "center",
            paddingTop: "20px",
            position: "fixed",
            left: 0,
            top: { md: "4%", lg: "9%" },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Link to="/active-tickets" style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color:
                    location.pathname === "/active-tickets"
                      ? "#118EEA"
                      : "black",
                  fontWeight:
                    location.pathname === "/active-tickets" ? 500 : "normal",
                }}
              >
                <ConfirmationNumberOutlinedIcon />
                <Typography variant="body1">Active Ticket</Typography>
              </Box>
            </Link>

            <Link to="/transaction" style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color:
                    location.pathname === "/transaction" ? "#118EEA" : "black",
                  fontWeight:
                    location.pathname === "/transaction" ? 500 : "normal",
                }}
              >
                <AssignmentOutlinedIcon />
                <Typography variant="body1">Transaction List</Typography>
              </Box>
            </Link>
          </Box>
        </Box>
      )}

      <Box
        sx={{
          marginLeft: { xs: "0", md: "15rem", lg: "19rem" },
          marginTop: "2rem",
          padding: "1rem",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          My Tickets
        </Typography>
        <Typography variant="body1" color="textSecondary">
          List of tickets and transactions you have made...
        </Typography>

        {/* Buttons */}
        <Box
          sx={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: 2 }}
        >
          {["Film", "Event", "Voucher"].map((label) => (
            <Button
              key={label}
              onClick={() => handleClick(label)}
              sx={{
                borderRadius: "23px",
                border:
                  activeButton === label
                    ? "1px solid black"
                    : "1px solid rgba(143, 152, 170, 1)",
                color:
                  activeButton === label ? "black" : "rgba(143, 152, 170, 1)",
                "&:hover": { color: "black", border: "1px solid black" },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        <Container
          sx={{
            maxWidth: isMobile ? "100%" : "800px",
            marginTop: "2rem",
            padding: "0 !important",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr" }, // 2 columns for tablets
            gap: 2,
          }}
        >
          {ticketInfo.map((ticket, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 3,
                textAlign: { xs: "center", md: "left" },
                borderBottom: "1px solid #ccc",
                paddingBottom: "1rem",
              }}
            >
              {/* Image Container */}
              <Box
                sx={{
                  width: { xs: "100%", md: "135px" },
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={ticket.movie_poster}
                  alt={ticket.movie_title}
                  style={{
                    width: "100%",
                    maxWidth: "135px",
                    height: "auto",
                    borderRadius: "8px",
                    display: "block",
                  }}
                />
              </Box>

              {/* Ticket Details */}
              <Box
                sx={{
                  flexGrow: 1,
                  textAlign: { xs: "center", md: "left" },
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {ticket.movie_title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {ticket.slot_time}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <LocationOnOutlinedIcon sx={{ marginRight: "5px" }} />
                  {ticket.location}
                  <Typography
                    component="span"
                    sx={{ color: "#414A63", marginLeft: "5px" }}
                  >
                    ({ticket.slot_type})
                  </Typography>
                </Typography>
              </Box>
            </Box>
          ))}
        </Container>
      </Box>
    </div>
  );
};

export default ActiveTicket;
