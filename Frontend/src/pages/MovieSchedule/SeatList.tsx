import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CropSquareIcon from "@mui/icons-material/CropSquare";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SeatLayout from "./SeatLayout";
import { resetData, setMappedSlots, setSlotTypeId } from "../../store/features/SlotSlice";
import { Navigate } from "react-router-dom";

const SeatList = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const selectedData = useSelector((state: RootState) => state.slot);
  const dispatch = useDispatch();

  let parsedSlot: any = null;
    let hasError = false;
  try {
    parsedSlot =
      typeof selectedData.slot === "string" && selectedData.slot.trim() !== ""
        ? JSON.parse(selectedData.slot)
        : selectedData.slot;
  } catch (error) {
     hasError = true;
  }

  const selectedSlotId = selectedData.slotTypeId;
  const matchingSlot = parsedSlot?.slots?.find((slot: any) =>
    slot.slot_times.some((st: any) => st.slot_id === selectedSlotId)
  );
  useEffect(() => {
    if (matchingSlot && matchingSlot.slot_times) {
      const slotIds = matchingSlot.slot_times.map((st: any) => st.slot_id);
      console.log(slotIds)
      dispatch(setMappedSlots(slotIds));
    }
  }, [matchingSlot, dispatch]);
 if (hasError || !matchingSlot) {
   return <Navigate to="/" />;
 }
  

  return (
    <div>
      <Box sx={{ marginLeft: { xs: "1rem", md: "3rem" }, marginTop: "2rem" }}>
        <Typography
          sx={{ color: "#333333", fontSize: { xs: "1.5rem", md: "2rem" } }}
        >
          Select Seat
        </Typography>
        <p style={{ color: "#5A637A", fontSize: "1rem", fontWeight: "400" }}>
          Choose the seat you will occupy during the movie screening
        </p>
      </Box>

      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2, md: 0 },
            marginBottom: "1rem",
          }}
        >
          {/* Time Selector */}
          <Box sx={{ marginLeft: { xs: 0, md: "4rem" } }}>
            <Button
              onClick={handleClick}
              variant="outlined"
              startIcon={<AccessTimeIcon />}
              sx={{
                backgroundColor: "white",
                borderColor: "#ccc",
                textTransform: "none",
                fontWeight: 500,
                color: "#333",
              }}
            >
              {selectedData.time || "Select Time"}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                sx: {
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "8px",
                  padding: "8px",
                  width: "400px",
                },
              }}
            >
              {matchingSlot?.slot_times.map((slotTime: any) => (
                <MenuItem
                  key={slotTime.slot_id}
                  onClick={() => {
                    dispatch(
                      setSlotTypeId({
                        slot_id: slotTime.slot_id,
                        time: slotTime.time,
                      })
                    );
                    // dispatch(resetData());
                    handleClose();
                  }}
                  sx={{
                    border: "1px solid #aaa",
                    borderRadius: "8px",
                    textAlign: "center",
                    justifyContent: "center",
                    backgroundColor:
                      slotTime.time === selectedData.time ? "#1A2C50" : "white",
                    color:
                      slotTime.time === selectedData.time ? "#ffffff" : "black",
                    "&:hover": {
                      backgroundColor: "#282764",
                      color: "#ffffff",
                    },
                  }}
                >
                  {slotTime.time}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Seat Legend */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-start" },
              gap: { xs: 2, md: 3 },
            }}
          >
            <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CropSquareIcon
                sx={{
                  bgcolor: "#1A2C50",
                  color: "#1A2C50",
                  width: 16,
                  height: 16,
                }}
              />
              Occupied
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CropSquareIcon
                sx={{
                  bgcolor: "transparent",
                  border: "1px solid #000",
                  width: 16,
                  height: 16,
                }}
              />
              Empty
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CropSquareIcon
                sx={{
                  bgcolor: "#118EEA",
                  color: "#118EEA",
                  width: 16,
                  height: 16,
                }}
              />
              Selected
            </Typography>
          </Box>
        </Box>

        {/* Seat Layout */}
        <SeatLayout />
      </Container>
    </div>
  );
};

export default SeatList;
