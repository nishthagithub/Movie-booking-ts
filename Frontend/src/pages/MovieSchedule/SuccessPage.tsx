import React from 'react'

import { Container, Typography, Stack, Box, Button } from '@mui/material'
import ASSETS from '../../Assets/index'

import { Link,useLocation,useParams } from 'react-router-dom'

const SuccessPage = () => {
  
  const { bookingId } = useParams();
  console.log(bookingId)
  return (
    <div>
      <Container
        sx={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        {/* Payment Success Heading */}
        <Typography
          sx={{ fontSize: { xs: "1.5rem", md: 36 }, fontWeight: "bold" }}
        >
          Payment Successful
        </Typography>

        {/* Image Section */}
        <Box sx={{ position: "relative", marginY: 0 }}>
          <img
            src={ASSETS.images.ROLL1}
            alt="Roll 1"
            style={{
              position: "absolute",
              top: "94%",
              left: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
              width: "181px",
              height: "109px",
            }}
          />
          <img
            src={ASSETS.images.ROLL2}
            alt="Roll 2"
            style={{ display: "block", width: "143px", height: "145px" }}
          />
        </Box>

        {/* Transaction Details Paragraph */}
        <Typography sx={{ marginTop: "5rem", maxWidth: "600px" }}>
          The transaction details have been sent to your email. You can also
          check other ticket details in "My Tickets" on both the website and
          your smartphone.
        </Typography>
        <Link to="/transaction-details"
        state={{bookingId}}>
          <Button
            sx={{
              width: { xs: "150px", md: "216px" },
              height: "64px",
              marginTop: "2rem",
              color: "#9DA8BE",
              border: "1px solid #9DA8BE",
            }}
            variant="outlined"
          >
            My Tickets
          </Button>
        </Link>
      </Container>
    </div>
  );
}

export default SuccessPage
