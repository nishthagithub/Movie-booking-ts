import React from "react";
import { Typography, Button, useMediaQuery, Box } from "@mui/material";
import ASSETS from "../Assets/index";
const cards = [
  {
    image: ASSETS.images.NEWSIMG3,
    category: "Spotlight",
    title: "Spider-Man: No Way Home Rilis Trailer Terbaru.",
    date: "08 Nov 2021",
  },
  {
    image: ASSETS.images.NEWSIMG1,
    category: "Spotlight",
    title: "Fakta Film Yowis Ben Finale Yang Perlu Kamu Ketahui Sebelum Nonton!",
    date: "09 Nov 2021",
  },
  {
    image:ASSETS.images.NEWSIMG2,
    category: "News",
    title: "Ghostbusters: Afterlife Hadir Menampilkan Variasi Hantu Baru",
    date: "15 Nov 2021",
  },
];
interface CardProps{
  data:[]
}
const Card = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    
    <Box
      sx={{
        display: "grid",
        flexWrap:"wrap",
        gridTemplateColumns: {xs:"1fr",
          sm:"1fr",
          md:"repeat(2, minmax(250px, 1fr))",
          lg:"repeat(3, minmax(350px, 1fr))"},
        gap: {sm:"1rem",md:"1rem"},
        maxWidth: "1430px",
        width: "100%",
        padding: "10px",
        margin: "1rem auto",
        justifyContent: "center", 
        
      }}
    >
      {cards.map((card, index) => (
        <Box
          key={index}
          sx={{
            width:{xs:"95%",sm:"50%",md:"419px"},
            textAlign: "center",
            margin:{xs:"auto",sm:" 0 auto"}
          }}
        >
          {/* Image */}
          <img
            src={card.image}
            alt={`image-${index}`}
            style={{
              width: isMobile ? "100%" : "435px",
              height: "237px",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />

          {/* Category Button */}
          {/* <Button
            variant="outlined"
            sx={{

              color: "black",
              border: "1px solid rgba(51, 61, 88, 1)",
              display: "flex",
              justifyContent: "start",
              alignContent:"start",
              alignItems:"start",
              
              textTransform: "none",
              margin: "1rem auto 0.5rem",
              padding: isMobile ? "4px 8px" : "8px 12px",
              
            }}
          >
            {card.category}
          </Button> */}
          <Button
  variant="outlined"
  sx={{
    color: "black",
    border: "1px solid rgba(51, 61, 88, 1)",
    display: "flex",
    justifyContent: "flex-start",  
    alignItems: "center",         
    textTransform: "none",
    margin: "1rem 0 0.5rem",       
    padding: isMobile ? "4px 8px" : "8px 12px",
  }}
>
  {card.category}
</Button>


          {/* Title */}
          <Typography sx={{ 
            fontSize: isMobile? "1rem" : "1.5rem", fontWeight: "bold", marginTop: "10px",
            color:"rgba(51, 51, 51, 1)", textAlign:"left" }}>
            {card.title}
          </Typography>

          {/* Date & TIX ID */}
          <Typography sx={{ fontSize: "14px", color: "rgba(90, 99, 122, 1)", marginTop: "4px",textAlign:"left" }}>
            {card.date} | TIX ID
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Card;
