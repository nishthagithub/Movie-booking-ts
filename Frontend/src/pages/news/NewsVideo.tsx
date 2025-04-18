
import { Box, Typography, useMediaQuery } from '@mui/material'
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import ASSETS from "../../Assets/index";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Card2 from '../../components/Card2';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';


const NewsVideo = () => {
  const { id } = useParams();
  const newsItem = useSelector((state: RootState) =>
    state.news.newsData.find((item) => item.id.toString() === id)
  );
  console.log(newsItem,id)

  const isMobile = useMediaQuery("(max-width: 768px)");
  const youtubeLink = "https://www.youtube.com/watch?v=JfVOs4VSpmA"; // Link to the YouTube video

  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center" p={3}>
        <Typography
          maxWidth="900px"
          fontWeight="700"
          sx={{ fontSize: isMobile ? "1.8rem" : "3.4rem" }}
        >
          {newsItem?.title}
        </Typography>
        <Box maxWidth="900px" width="100%" textAlign="start">
          <Typography variant="body2" color="textSecondary" mt={2}>
            {newsItem?.date} | TIX ID
          </Typography>

          {/* Image Wrapper with Play Button */}
          <Box
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={6}
          >
            <img
              src={newsItem?.image}
              alt="Trailer Thumbnail"
              style={{
                maxWidth: isMobile ? "350px" : "858px",
                width: "100%",
                height: isMobile ? "auto" : "447px",
                objectFit:"cover"
              }}
            />

            {/* Play Icon Positioned in Center */}
            <Box
              component="a"
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                textDecoration: "none",
              }}
            >
              <PlayCircleOutlineIcon
                sx={{
                  fontSize: isMobile ? "70px" : "161px",
                  color: "white",
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { color: "rgba(255, 255, 255, 0.8)" },
                }}
              />
            </Box>
          </Box>

          <Typography mt={3} sx={{ fontSize: isMobile ? "1.3rem" : "1.5rem" }}>
            Sumber : Marvel Entertainment | YouTube
          </Typography>

          <Typography mt={3} sx={{ fontSize: "1.5rem" }}>
            Share this Video
          </Typography>
          <Box sx={{ display: "flex", gap: 2, marginTop: "1rem" }}>
            <InstagramIcon />
            <TwitterIcon />
            <FacebookIcon />
          </Box>

          <Typography
            textAlign="center"
            fontWeight="700"
            mt={4}
            sx={{ fontSize: isMobile ? "1.5rem" : "2rem" }}
          >
            See Other Videos
          </Typography>
        </Box>
      </Box>
      <Card2 />
    </div>
  );
}

export default NewsVideo;
