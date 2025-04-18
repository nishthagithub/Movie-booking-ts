
import { Typography, Box, Button,useMediaQuery } from "@mui/material";
import Container from "@mui/material/Container";

import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import Card2 from "../../components/Card2";
import { Link, useParams } from "react-router-dom";
import ASSETS from "../../Assets/index";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const NewsCard = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { id } = useParams<{ id: string }>();
    // console.log(id)
     const newsItem = useSelector((state: RootState) =>
       state.news.newsData.find((item) => item.id.toString() === id)
     );
       if (!newsItem) {
         return (
           <Box sx={{ textAlign: "center", marginTop: "4rem" }}>
             News item not found
           </Box>
         );
       }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px",
          minHeight: "80vh",
        }}
      >
        <Box>
          <Container>
            <Typography
              fontWeight="bold"
              gutterBottom
              //   fontSize="3.4rem"
              textAlign="start"
              sx={{
                fontSize: isMobile ? "1.2rem" : "3.4rem",
                maxWidth: isMobile ? "500px" : "880px",
              }}
            >
              {newsItem.title}
            </Typography>
            <Typography
              variant="body2"
              color="#5A637A"
              textAlign="start"
              gutterBottom
            >
              {newsItem.date} | TIX ID
            </Typography>
          </Container>
        </Box>
        <Link to={`/news-video/${newsItem.id}`}>
          <Box
            component="img"
            src={newsItem.image}
            alt="photo"
            sx={{
              width: isMobile ? "90%" : "858px",
              marginTop: "2rem",
              height: isMobile ? "auto" : "447px",
              borderRadius: "8px",
              marginBottom: "20px",
              objectFit: "cover",
            }}
          />
        </Link>

        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "start",
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: "100%", sm: "400px", md: "680px" }, // Responsive max-width
              textAlign: "start",
              lineHeight: "1.5",
              marginLeft: { xs: "0", md: "-10rem" },
              padding: { xs: "1rem", md: "0" },
            }}
          >
            <Typography variant="body1" paragraph>
              {newsItem.paragraph1}
            </Typography>

            <Typography variant="body1" paragraph>
              {newsItem.paragraph2}
            </Typography>

            <Typography variant="body1" paragraph>
              {newsItem.paragraph3}
            </Typography>

            {/* Social Share Section */}
            <Box sx={{ maxWidth: "748px", width: "100%" }}>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "start",
                  fontWeight: "bold",
                  marginTop: { xs: "2rem", md: "4rem" }, // Adjust spacing for mobile
                }}
              >
                Share this Article
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <InstagramIcon />
                <TwitterIcon />
                <FacebookIcon />
              </Box>
            </Box>
          </Box>
        </Container>
        <Box>
          <Button
            sx={{
              color: "#333333",
              display: "flex",
              alignItems: "center",
              gap: 1,
              border: "1px solid black",
              borderRadius: "60px",
              width: "101px",
              height: "48px",
            }}
          >
            <ThumbUpAltOutlinedIcon />
            403
          </Button>
        </Box>
        <Typography
          sx={{
            marginTop: "2rem",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          {" "}
          See Other Articles
        </Typography>
        <Card2 />
      </Box>
    </div>
  );
};

export default NewsCard;
