import * as React from "react";
import { Box, useTheme, Grid, Typography, useMediaQuery, Divider } from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import ASSETS from "../Assets/index";

const footerLinks = [
  {
    title: "Company",
    links: ["Contact Us", "About", "Partner"],
  },
  {
    title: "About",
    links: ["TIX ID News", "Cinema", "My Tickets", "Payment", "Installment"],
  },
  {
    title: "Support",
    links: ["Help Center", "Privacy Policy", "FAQ", "Terms and Conditions", "Covid-19 Update"],
  },
];

export default function Footer() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
    
      <Divider
        sx={{
          marginTop: "3rem",
          border: "1px solid #BDC5D4",
        }}
      />
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "white",
          color: "black",
          padding: "2rem",
          height: "auto",
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="flex-start"
          flexDirection={{ xs: "row", sm: "row", md: "row" }}
          flexWrap="wrap"
        >
          {/* Logo Section */}
          <Grid
            item
            xs={12}
            sm={12}
            md={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: { xs: 2, sm: 2, md: 0 },
            }}
          >
            <img
              src={ASSETS.images.LOGO}
              alt="Logo"
              style={{ width: isMobile ? "90px" : "130px", height: "auto" }}
            />
          </Grid>

          {/* Footer Links - NOW IN A SINGLE ROW on xs & sm */}
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            container
            spacing={2}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            textAlign="left"
          >
            {footerLinks.map((section, index) => (
              <Grid key={index} item xs={4} sm={4} md={4}>
                {" "}
                {/* Ensuring side-by-side layout */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6">{section.title}</Typography>
                  {section.links.map((link, linkIndex) => (
                    <Typography
                      key={linkIndex}
                      variant="body2"
                      sx={{
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                          fontSize: "1rem",
                        },
                      }}
                    >
                      {link}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Social Media & App Download Section */}
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mt: { xs: 2, sm: 2, md: 0 },
            }}
          >
            <Typography variant="h6">Follow Social Media</Typography>
            <Box display="flex" gap={2} mt={2}>
              <InstagramIcon />
              <TwitterIcon />
              <FacebookIcon />
            </Box>

            <Typography variant="h6" mt={3}>
              Download TIX ID App
            </Typography>
            <Box display="flex" gap={2} mt={2}>
              <img
                src={ASSETS.images.PLAYSTORE}
                alt="Google Play"
                style={{ width: "120px" }}
              />
              <img
                src={ASSETS.images.APPSTORE}
                alt="App Store"
                style={{ width: "120px" }}
              />
            </Box>

            <Typography sx={{ fontSize: "0.7rem", textAlign: "center", mt: 2 }}>
              2021 TIX ID - PT Nusantara Elang Sejahtera.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
