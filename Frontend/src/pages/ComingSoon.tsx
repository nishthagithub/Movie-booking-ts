import React from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import ASSETS from "../Assets"
import { Link } from "react-router-dom";

const cards = [
  {
    image: ASSETS.images.POSTER4,
    category: "Action",
    title: "The Matrix: Resurrections",
  },
  {
    image: ASSETS.images.PIC1,
    category: "Adventure",
    title: "Resident Evil: Welcome to Raccoon City",
  },
  {
    image: ASSETS.images.POSTER3,
    category: "Sci-Fi",
    title: "Sword Art Online: Progressive - Aria of a Starless Night",
  },
];

const ComingSoon = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (  
    <div>
      {/* Header */}
      <Typography
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "3rem",
          marginLeft: {xs:"1rem",sm:"2rem",md:"2rem",lg:"4rem"},
          marginRight: isMobile ? "1rem" : "4rem",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem" }}>Coming Soon</Typography>
        <Link to="/upcoming-movies">
        <Typography sx={{ color: "blue", fontSize: "1rem" }}>See All</Typography>
        </Link>
      </Typography>

      <Typography
        sx={{
          marginLeft:{xs:"1rem",sm:"2rem",md:"2rem",lg:"4rem"},
          fontSize: "1rem",
          color: "rgba(0, 0, 0, 1)",
          marginTop: "0.7rem",
        }}
      >
        Wait for its arrival at your favorite cinema!
      </Typography>

      {/* Grid Container */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {xs:"1fr",sm:"repeat(2,1fr)" ,lg:"repeat(3, 1fr)"},
          gap:"1rem", 
          marginTop: isMobile ? "2rem" : "3rem",
          padding: isMobile ? "0 1rem" : "1rem", // Ensure consistent spacing
        }}
      >
        {cards.map((card, index) => (
          <Box
            key={index}
            sx={{
              textAlign: "start",
            // maxWidth: "360px",
            width: {xs:"300px",md:"360px"},
              height: {xs:"auto",sm:"auto",md:"674px"},
              margin: "auto",
              display: "flex",
            //   height:"642px",
              flexDirection: "column",
            
            }}
          >
            {/* Image */}
            <img
              src={card.image}
              alt={`movie-${index}`}
              style={{
                width: "100%", 
                // maxWidth: "390px", 
                height: "507px",
                objectFit: "cover", 
                borderRadius: "6px",
              }}
            />
            {/* Movie Title */}
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold",alignSelf:"self-start", 
                marginTop:isMobile ? "0.8rem":  "10px", 
                display:"flex", alignItems:"center", height:"141px" }}>
              {card.title}
            </Typography>
            {/* Buttons */}
            <Box 
              gap={1.2} mt={2} height="36px"   sx={{
                marginTop :isMobile ? " 1rem":"auto",
            display:"flex" ,
            alignSelf: isMobile ? "center": "self-start",
            marginBottom: isMobile ? "2rem" : "0"
              }}  >
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(to right ,rgba(242, 196, 111, 1),rgba(198, 148, 63, 1))",
                  "&:hover": { bgcolor: "rgba(198, 148, 63, 1)" },
                }}
              >
                XXI
              </Button>
              <Button variant="contained" sx={{ bgcolor: "rgba(236, 30, 43, 1)" }}>CGV</Button>
              <Button variant="contained" sx={{ bgcolor: "rgba(0, 14, 98, 1)" }}>CinePolis</Button>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default ComingSoon;
