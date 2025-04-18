import React, { useEffect, useState } from "react";
import { Typography, Button, useMediaQuery, Box } from "@mui/material";
import ASSETS from "../Assets";
import image1 from "../Assets/images/TIX ID News (2).png";
import image2 from "../Assets/images/TIX ID News (3).png";
import image3 from "../Assets/images/TIX ID News (4).png"
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../store/features/NewsSlice";
import { Link } from "react-router-dom";

const cards = [
  {
    image: image1,
    category: "News",
    title: "Ghostbusters: Afterlife Hadir Menampilkan Variasi Hantu Baru",
    date: "08 Nov 2021",
  },
  {
    image: image2,
    category: "News",
    title: "House of Gucci: Kisah Pewaris Tunggal Gucci Pada Tahun 1955.   ",
    date: "09 Nov 2021",
  },
  {
    image: image3,
    category: "News",
    title: "Aksi Donnie Yen Dalam Film Aksi Hongkong Terbaru ",
    date: "15 Nov 2021",
  },
];

const Card2 = () => {
  const dispatch = useDispatch<AppDispatch>();
   const newsData = useSelector((state: RootState) => state.news.newsData);
   const [randomNews, setRandomNews] = useState<typeof newsData>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);
  useEffect(() => {
    if (newsData.length >= 3) {
      const shuffled = [...newsData].sort(() => 0.5 - Math.random());
      setRandomNews(shuffled.slice(0, 3));
    }
  }, [newsData]);


  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(250px, 1fr))",
          md: "repeat(2, minmax(300px, 1fr))",
          lg: "repeat(3, minmax(350px, 2fr))",
        },
        gap: "1rem",
        maxWidth: "1430px",
        width: "100%",
        padding: "10px",
        margin: { xs: "auto", md: "1rem auto" },
      }}
    >
      {randomNews.map((card, index) => (
        <Link
          to={`/tid-news/${card.id}`}
          key={index}
          style={{ textDecoration: "none" }}
        >
          <Box
            key={index}
            sx={{
              width: isMobile ? "100%" : "419px",
              textAlign: "center",
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
            <Typography
              sx={{
                fontSize: isMobile ? "1rem" : "1.5rem",
                fontWeight: "bold",
                marginTop: "10px",
                color: "rgba(51, 51, 51, 1)",
                textAlign: "left",
              }}
            >
              {card.title}
            </Typography>

            {/* Date & TIX ID */}
            <Typography
              sx={{
                fontSize: "14px",
                color: "rgba(90, 99, 122, 1)",
                marginTop: "4px",
                textAlign: "left",
              }}
            >
              {card.date} | TIX ID
            </Typography>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default Card2;
