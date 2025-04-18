import React, { useState,useEffect } from "react";
import { Box, Typography, Button, Container, IconButton, Drawer,useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ASSETS from "../../Assets";
import axios from "axios";

const TransactionList = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
     const response = await axios.get(
       `${API_URL}/api/cpay/${userId}`
     );
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
      {/* Hamburger Menu for Mobile */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: "65px",
            left: "10px",
            zIndex: 1200,
            display: { xs: "block", md: "none" },
          }}
        >
          <IconButton onClick={toggleMenu}>
            <MenuIcon sx={{ fontSize: "2rem", color: "black" }} />
          </IconButton>
        </Box>
      )}

      {/* Sidebar for Desktop */}
      <Box
        sx={{
          width: { md: "200px", lg: "250px" },
          minHeight: isScrolled ? "50vh" : "100vh",
          bgcolor: "#DADFE8",
          paddingTop: "20px",
          position: "fixed",
          left: 0,
          top: { md: "4%", lg: "9%" },
          display: { xs: "none", md: "block" },
        }}
      >
        <SidebarContent location={location} />
      </Box>

      {/* Drawer (Sidebar on Mobile) */}
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <Box
          sx={{
            width: "250px",
            height: "100vh",
            bgcolor: "#DADFE8",
            padding: "20px",
          }}
        >
          <IconButton onClick={toggleMenu} sx={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
          <SidebarContent location={location} />
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          marginLeft: { xs: "0rem", md: "15rem", lg: "19rem" },
          marginTop: "2rem",
          padding: "20px",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          My Tickets
        </Typography>
        <Typography variant="body1" color="textSecondary">
          List of tickets and transactions you have made...
        </Typography>

        {/* Category Buttons */}
        <Box sx={{ marginTop: "1rem", display: "flex", gap: 2 }}>
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
                transition: "all 0.3s ease-in-out",
                "&:hover": { color: "black", border: "1px solid black" },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        {/* Ticket List */}
        <Container
          sx={{ maxWidth: "900px", marginTop: "2rem", padding: "0 !important" }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1fr",
              gap: isTablet ? 2 : 0,
              alignItems: "center",
            }}
          >
            {ticketInfo.map((ticket, index) => (
              <React.Fragment key={index}>
                {/* Ticket Item */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: isMobile ? "center" : "left",
                    gap: 2,
                    padding: "15px",
                    borderRadius: "8px",
                    width: { md: "75%" },
                  }}
                >
                  {/* Image */}
                  <img
                    src={ticket.movie_poster}
                    alt={ticket.movie_title}
                    width="135px"
                    height="auto"
                    style={{ borderRadius: "8px" }}
                  />

                  {/* Ticket Details */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      flex: 1,
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" color="#414A63">
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
                        color: "#9DA8BE",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        justifyContent: isMobile ? "center" : "flex-start",
                      }}
                    >
                      <LocationOnOutlinedIcon sx={{ marginRight: "5px" }} />
                      {ticket.location}{" "}
                      <Typography
                        component="span"
                        sx={{ color: "#414A63", marginLeft: "5px" }}
                      >
                        ({ticket.slot_type})
                      </Typography>
                    </Typography>
                  </Box>

                  {/* Status Button */}
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: ticket.payment_status ? "#118EEA" : "red",
                      width: "130px",
                      fontSize: "0.9rem",
                    }}
                  >
                    {ticket.payment_status ? "Success" : "Fail"}
                  </Button>
                </Box>

                {/* Vertical Line for Tablet View */}
                {isTablet &&
                  index % 2 === 0 &&
                  index !== ticketInfo.length - 1 && (
                    <Box
                      sx={{
                        width: "1px",
                        height: "100%",
                        bgcolor: "#D3D3D3",
                        alignSelf: "stretch",
                      }}
                    />
                  )}

                {/* Horizontal Line for Mobile & Desktop */}
                {!isTablet && index !== ticketInfo.length - 1 && (
                  <Box
                    sx={{
                      width: { md: "80%" },
                      height: "1px",
                      bgcolor: "#D3D3D3",
                      margin: "1rem 0",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Box>
        </Container>
      </Box>
    </div>
  );
};

// Sidebar Content Component
const SidebarContent = ({ location }: { location: any }) => (
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
          color: location.pathname === "/active-tickets" ? "#118EEA" : "black",
          fontWeight: location.pathname === "/active-tickets" ? "bold" : "normal",
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
          color: location.pathname === "/transaction" ? "#118EEA" : "black",
          fontWeight: location.pathname === "/transaction" ? "bold" : "normal",
        }}
      >
        <AssignmentOutlinedIcon />
        <Typography variant="body1">Transaction List</Typography>
      </Box>
    </Link>
  </Box>
);

export default TransactionList;
