import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ASSETS from "../Assets";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, Radio, FormControlLabel, useMediaQuery,Box } from "@mui/material";

const images = [ASSETS.images.CAR1, ASSETS.images.CAR2, ASSETS.images.CAR3];

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSelect = (selectedIndex:any) => {
    setIndex(selectedIndex);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div style={{ maxWidth: "1390px", margin: "0 auto", marginTop: "4rem", position: "relative" }}>
      {/* Hide Bootstrap Carousel Arrows and Indicators */}
      <style>
        {`
          .carousel-control-prev, 
          .carousel-control-next, 
          .carousel-indicators { 
            display: none !important; 
          }
          .custom-icon-button:hover {
            background-color: white !important;
            box-shadow: 2px 2px 6px #333 !important;
            opacity: 1 !important;
          }
        `}
      </style>

      {/* {!isMobile ? ( */}
        <Carousel activeIndex={index} onSelect={handleSelect} interval={1000}>
          {images.map((image, idx) => (
            <Carousel.Item key={idx}>
              <Box sx={{
              height: {xs:"auto",md:"302px"}, objectFit: "cover"
              }}>
              <img
                className="d-block w-100"
                src={image}
                alt={`Slide ${idx + 1}`}
                
              />
              </Box>
            </Carousel.Item>
          ))}
        </Carousel>
      {/* ) : ( */}

        {/* <Carousel activeIndex={index} onSelect={handleSelect} interval={1000}>
          {images.map((image, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100"
                src={image}
                alt={`Slide ${idx + 1}`}
                style={{ height: "auto",           
                    objectFit: "cover",
                    width: "100%", 
                display: "block" }}
              />
            </Carousel.Item>
          ))}
        </Carousel> */}
      {/* )} */}

      {/* Left Chevron */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: {xs:"5%",sm:"3%",md:"5%",lg:"-2%"},
          top: "50%",
          transform: "translateY(-50%)",
          color: "black",
          bgcolor: "white",
          boxShadow: "2px 2px 6px #333",
          borderRadius: "50%",
          p: isMobile ? "5px" : "10px",
          zIndex: 10,
          "&:hover": { bgcolor: "white", opacity: 1 },
        }}
      >
        <ChevronLeft sx={{ fontSize: isMobile ? 17 : 40 }} />
      </IconButton>

      {/* Right Chevron */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right:  {xs:"5%",sm:"3%",md:"5%",lg:"-2%"},
          top: "50%",
          transform: "translateY(-50%)",
          color: "black",
          bgcolor: "white",
          boxShadow: "1px 1px 4px #333",
          borderRadius: "50%",
          p: isMobile ? "5px" : "10px",
          zIndex: 10,
          "&:hover": { bgcolor: "white", opacity: 1 },
        }}
      >
        <ChevronRight sx={{ fontSize: isMobile ? 17 : 40 }} />
      </IconButton>

      {/* Radio Buttons */}
      <div style={{ textAlign: "center", marginTop: isMobile ? "-7%" : "-3%" }}>
        {images.map((_, idx) => (
          <FormControlLabel
            key={idx}
            control={
              <Radio
                checked={index === idx}
                onChange={() => handleSelect(idx)}
                sx={{
                  color: index === idx ? "#be9ba2" : "white",
                  "&.Mui-checked": { color: "white", border: "none" },
                  "& .MuiSvgIcon-root": {
                    fontSize: isMobile ? "1rem" : "1.5rem",
                    width: "1.5rem",
                    height: "1rem",
                  },
                }}
              />
            }
            label=""
          />
        ))}
      </div>
    </div>
  );
}

export default ControlledCarousel;
