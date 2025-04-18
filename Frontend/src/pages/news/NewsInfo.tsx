import React, { useEffect } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { NewsData } from "../../store/NewsData"; // Assuming your data file
import { useSelector, useDispatch } from "react-redux";
import { fetchNews, setCategory } from "../../store/features/NewsSlice";
import { AppDispatch, RootState } from "../../store/store";

const NewsList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedCategory,searchQuery,newsData,loading,error } = useSelector((state:RootState) => state.news);
     useEffect(() => {
       dispatch(fetchNews());
     }, [dispatch]);
    const filteredNews = newsData.filter(
        (news) => news.category === selectedCategory && news.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log(filteredNews);
       if (loading) {
         return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
       }
     
      
  return (
    <div>
      {filteredNews.length > 0 ? (
        filteredNews.map((news, index) => (
          <React.Fragment key={news.id}>
            <Box
              key={news.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { md: "40px", lg: "60px" },
                padding: "16px",
                maxWidth: { lg: "1400px" },
                flexDirection: {
                  xs: "column",
                  md: index % 2 === 0 ? "row" : "row-reverse",
                },
                marginLeft: { xs: "0", md: index % 2 === 0 ? "0rem" : "4rem" },
              }}
            >
              {/* Image Section */}
              <Link to={`/tid-news/${news.id}`}>
                <Box
                  component="img"
                  src={news.image}
                  alt={news.title}
                  sx={{
                    width: { xs: "100%", md: "auto", lg: "585px" },
                    height: { xs: "237px", md: "240px", lg: "410px" },
                    borderRadius: "8px",
                    marginLeft:
                      index % 2 === 0 ? { md: "2rem", lg: "3.5rem" } : "0",
                    marginRight:
                      index % 2 !== 0 ? { md: "2rem", lg: "1rem" } : "0",
                    objectFit: { xs: "cover" },
                  }}
                />
              </Link>

              {/* Description Section */}
              <Box
                sx={{
                  flex: 1,
                  width: { md: "150px", lg: "200px" },
                  marginTop: { xs: "1rem" },
                  marginLeft: { xs: "1rem" },
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    border: "1px solid rgba(51, 61, 88, 1)",
                    color: "rgba(51, 51, 51, 1)",
                    padding: "14px 12px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  {news.category}
                </Button>

                <Typography
                  sx={{
                    marginTop: "8px",
                    fontWeight: "bold",
                    fontSize: { md: "1.5rem", lg: "2.5rem" },
                  }}
                >
                  {news.title}
                </Typography>

                <Typography
                  sx={{ marginTop: "4px", color: "gray", fontSize: "1rem" }}
                >
                  {news.description}
                </Typography>

                <Typography
                  sx={{ marginTop: "8px", fontSize: "1.5rem", color: "gray" }}
                >
                  {news.date} | TIX ID
                </Typography>
              </Box>
            </Box>

            <Divider
              sx={{
                border: "1px solid grey",
                marginY: "1rem",
              }}
            />
          </React.Fragment>
        ))
      ) : (
        <Box
          sx={{
            textAlign: "center",
            marginTop: "4rem",
            color: "#be9ba2",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          No Articles Found
        </Box>
      )}
    </div>
  );
};

export default NewsList;
