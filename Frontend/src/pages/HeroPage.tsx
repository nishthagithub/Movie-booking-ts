// import React, { useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";

// import Navbar from "../components/Navbar";
import Carousal from "./Carousal";
// import Card from "../components/Card";
import ComingSoon from "./ComingSoon";
import ImageSlider1 from "../pages/imgSlid"
import { Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetSlot } from "../store/features/SlotSlice";
import Card2 from "../components/Card2";

const ImageSlider = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch =useDispatch();
  useEffect(()=>{
   dispatch(resetSlot());
  })

  return (
    <>
      <ImageSlider1/>

      <Box>
        <Carousal />
        {/* newss */}
        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "3rem",
            marginLeft:  {xs:"1rem",sm:"1rem",md:"2rem",lg:"4rem"},
          }}
        >
          <Typography sx={{ fontSize: "1.5rem" }}>TIX ID NEWS</Typography>
          <Link to="/tid-news">
          <Typography
            sx={{
              color: "blue",
              fontSize: "1rem",
              marginRight: isMobile ? "1rem" : "4rem",
            }}
          >
            See All
          </Typography>
          </Link>
        </Typography>
        <Typography
          sx={{
            marginLeft:{ xs:"1rem",sm:"2rem",md: "2rem",lg:"4rem"},
            fontSize: "1rem",
            color: "rgba(0, 0, 0, 1)",
            marginTop: "0.7rem",
          }}
        >
          The latest news about the world of cinema for you!
        </Typography>
        <Card2 />

        {/* coming soon */}
        <ComingSoon />

      
      </Box>
    </>
  );
};

export default ImageSlider;
