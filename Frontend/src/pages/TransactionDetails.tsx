import { Box, Container, Typography,useMediaQuery } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download"; // Import the download icon
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import html2pdf from "html2pdf.js"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { resetSlot } from "../store/features/SlotSlice";
import { resetMovie } from "../store/features/moveSlice";

const TransactionDetails = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch();  
  const navigate=useNavigate()
const downloadPDF = () => {
  const element = document.getElementById("pdf-content");

  if (!element) {
    console.error("PDF element not found!");
    return;
  }

  import("html2pdf.js")
    .then((html2pdf) => {
      return html2pdf
        .default()
        .from(element)
        .set({
          margin: 10,
          filename: "ticket.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .save();
    })
    .then(() => {
      setTimeout(()=>{
dispatch(resetSlot());
dispatch(resetMovie());

navigate("/");
      },3000)
      
      
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
    });
};



     const getCurrentDate = () => {
       const today = new Date();
       const day = String(today.getDate()).padStart(2, "0");
       const month = today.toLocaleString("en-US", { month: "short" }); // 'Apr'
       return `${day}, ${month}`;
     };
     
       const slotId = useSelector((state: RootState) => state.slot.slotTypeId);

     const { format, time, price, selectedSlots, date, theaterName } =
       useSelector((state: RootState) => state.slot);
    
     const totalPayment = selectedSlots.reduce((acc, seat) => acc + (seat.price || 500), 0) 
     + (300 * selectedSlots.length) - 70;
       
    const circleCount = isMobile ? 7:15;
  const selectedMovie = useSelector((state: any) => state.movie.selectedMovie);
    const selectedData = useSelector((state: RootState) => state.slot);
    
    const location = useLocation();
   const { bookingId } = location.state || {};
   console.log("Received state:", bookingId);
  return (
    <div>
      <Box id="pdf-content">
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: isMobile ? "1.3rem" : "2rem",
            fontWeight: "700",
            marginTop: "1rem",
            color: "#333333",
          }}
        >
          Transaction Details
        </Typography>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          {/* Blue Box (Main Ticket Info) */}
          <Box>
            <Box
              sx={{
                width: isMobile ? "320px" : "638px",
                bgcolor: "#1A2C50",
                color: "#FFFFFF",
                padding: "1.5rem",
                borderRadius: "8px 8px 0 0",
              }}
            >
              <Typography
                sx={{
                  color: "#F2C46F",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                {selectedMovie?.movie_title}
              </Typography>

              <Box
                sx={{
                  marginTop: "1rem",
                  display: "flex",
                  alignItems: "stretch",
                  justifyContent: "space-between",
                  gap: "2rem",
                  flexWrap: isMobile ? "wrap" : "nowrap",
                }}
              >
                {/* Left Side: Location, Date, and Time */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    minWidth: "250px",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: "bold", color: "#9DA8BE" }}>
                      Location
                    </Typography>
                    <Typography>{theaterName}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "2rem" }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: "bold", color: "#9DA8BE" }}>
                        Date
                      </Typography>
                      <Typography>
                        {!date || date.trim() === "" ? getCurrentDate() : date}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: "bold", color: "#9DA8BE" }}>
                        Time
                      </Typography>
                      <Typography>{time}</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Vertical Separator */}
                {!isMobile && (
                  <Box
                    sx={{
                      width: "1px",
                      height: "100px",
                      backgroundColor: "#9DA8BE",
                      alignSelf: "center",
                    }}
                  />
                )}

                {/* Right Side: Class and Screen */}
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <Box sx={{ marginBottom: "1rem" }}>
                    <Typography sx={{ fontWeight: "bold", color: "#9DA8BE" }}>
                      Class
                    </Typography>
                    <Typography>{selectedData.format}</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: "bold", color: "#9DA8BE" }}>
                      Screen
                    </Typography>
                    <Typography>{slotId}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Yellow Box (Ticket Style) */}
            <Box
              sx={{
                width: isMobile ? "320px" : "638px",
                height: isMobile ? "auto" : "170px",
                bgcolor: "#F2C46F",
                color: "#333333",
                padding: "1.5rem",
                borderRadius: "0 0 8px 8px",
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
                overflow: "hidden",
              }}
            >
              {/* Left Side: Booking Details */}
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Booking ID:
                  </Typography>
                  <Typography>
                    <Typography>
                      {location.state?.bookingId || "N/A"}
                    </Typography>
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "0.5rem",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>Pass:</Typography>
                  <Typography>122</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "0.5rem",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>Seat No:</Typography>
                  <Typography>
                    {selectedSlots.map((seat) => seat.seat).join(", ")}
                  </Typography>
                </Box>
              </Box>

              {/* Download Icon */}
              <Box
                sx={{
                  border: isMobile ? "0.5px solid black" : "1px solid black",
                  width: isMobile ? "50px" : "80px",
                  height: isMobile ? "50px" : "80px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: isMobile ? "0" : "3rem",
                }}
              >
                <DownloadIcon
                  onClick={downloadPDF}
                  
                  sx={{
                    fontSize: isMobile ? 30 : 40,
                    cursor: "pointer",
                    color: "#333333",
                  }}
                />
              </Box>

              {/* Bottom Circles */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: "-12px",
                  left: 0,
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingX: "6px",
                }}
              >
                {[...Array(circleCount)].map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: "#ffffff",
                      borderRadius: "50%",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          <Typography
            sx={{
              textAlign: "left",
              fontWeight: "bold",
              width: isMobile ? "320px" : "638px",
              marginBottom: "1rem",
              color: "#000000",
              fontSize: isMobile ? "1.2rem" : "1.5rem",
            }}
          >
            Purchase Details
          </Typography>

          <Box
            sx={{
              width: isMobile ? "320px" : "638px",
              color: "#333333",
              fontSize: "1rem",
            }}
          >
            {/* Order Details */}
            {[
              {
                label: "Order Id",
                amount: `#${Math.floor(100 + Math.random() * 900)}`,
              },
              {
                label: format,
                amount: price,
                multiplier: `x${selectedSlots.length}`,
              },
              {
                label: "Service Fee",
                amount: "Rs. 300",
                multiplier: `x${selectedSlots.length}`,
              },
              { label: "Promo Code", amount: "- Rp. 70" },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <Typography>{item.label}</Typography>
                <Typography>
                  {item.amount}{" "}
                  <span style={{ color: "#414A63", fontWeight: "bold" }}>
                    {item.multiplier}
                  </span>
                </Typography>
              </Box>
            ))}

            {/* Horizontal Divider */}
            <hr style={{ border: "1px solid #333", margin: "10px 0" }} />

            {/* Total Amount */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <Typography>Total Amount</Typography>
              <Typography>
                {" "}
                Rs {totalPayment.toLocaleString("en-IN")}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                marginTop: "1rem",
                gap: 2,
                color: "#1A2C50",
              }}
            >
              <ArrowBackIcon
                sx={{ fontSize: isMobile ? 20 : 25, cursor: "pointer" }}
              />
              <Typography
                sx={{
                  fontSize: isMobile ? "0.9rem" : "1.2rem",
                  color: "#1A2C50",
                }}
              >
                Back
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default TransactionDetails;
