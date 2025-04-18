import {
    Box,
    Stack,
    Typography,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import  { useEffect, useState } from "react";
  
  
  import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
  import ChevronRightIcon from "@mui/icons-material/ChevronRight";
  import { addDays, format } from "date-fns";
  
 
 export const generateDates = (days = 6) => {
    return Array.from({ length: days }, (_, i) => {
      const date = addDays(new Date(), i);
      return {
        date: format(date, "dd MMM"), 
        day: format(date, "EEE").toUpperCase(), 
      };
    });
  };
  interface DateSlotsProps {
    selectedIndex: number | null;
    setSelectedIndex: (index: number | null) => void;
    setSelectedDate: (date: string) => void;
    setSelectedDay: (day: string) => void;
  }
  
  const allDates = generateDates(6); 
  
  const DateSlots = ({ selectedIndex, setSelectedIndex,setSelectedDate,setSelectedDay }: DateSlotsProps) => {
    const [startIndex, setStartIndex] = useState(0);
    useEffect(() => {
      if (selectedIndex === null) {
        setSelectedIndex(0);
      }
    }, [selectedIndex, setSelectedIndex]);
    
    
    const isMobile = useMediaQuery("(max-width: 768px)");
    const visibleDates = allDates.slice(startIndex, startIndex + 5);
    const lastTwoDisabled = startIndex + 5 > allDates.length - 1;

    const handleNext = () => {
      if (startIndex + 5 < allDates.length) {
        setStartIndex((prev) => prev + 1);
      }
    };

    const handlePrev = () => {
      if (startIndex > 0) {
        setStartIndex((prev) => prev - 1);
      }
    };
    const handleDateSelection = (index: number) => {
      // console.log("Setting Selected Day Index to", index);
       const selectedDate = allDates[index].date;
       const selectedDay = allDates[index].day;
       // Get selected date
      //  console.log("Selected Date:", selectedDate);
      //  console.log(selectedDay)
      setSelectedIndex(index);
      setSelectedDate(selectedDate); 
      setSelectedDay(selectedDay);
      
    };


    return (
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: { md: "center" },
          gap: { xs: "0.1rem", sm: "1rem", md: "1.5rem" },
        }}
      >
        <IconButton onClick={handlePrev} disabled={startIndex === 0}>
          <ChevronLeftIcon sx={{ color: "#333333", fontSize: 30 }} />
        </IconButton>

        {visibleDates.map((item, index) => {
           const actualIndex = startIndex + index;
          
          const isDisabled = lastTwoDisabled && index >= 3;
          return (
            <Box
              key={index}
              onClick={() => !isDisabled && handleDateSelection(actualIndex)}
              sx={{
                border: "1px solid black",
                width: { xs: "60px", sm: "70px", md: "86px" },
                height: { xs: "70px", md: "82px" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "8px",
                backgroundColor:
                  selectedIndex === actualIndex
                    ? "#1A2C50"
                    : isDisabled
                    ? "#ccc"
                    : "white",
                color:
                  selectedIndex === actualIndex
                    ? "white"
                    : isDisabled
                    ? "#888"
                    : "black",
                pointerEvents: isDisabled ? "none" : "auto",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                cursor: isDisabled ? "default" : "pointer",
                "&:hover": {
                  backgroundColor: isDisabled ? "#ccc" : "#1A2C50",
                  color: isDisabled ? "#888" : "white",
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "500",
                  color: selectedIndex === index ? "white" : "#5A637A",
                }}
              >
                {item.date}
              </Typography>
              <Typography
                variant="body2"
                fontSize="1.2rem"
                fontWeight="900"
                sx={{
                  fontSize: isMobile ? "1rem" : "1.2rem",
                  color: selectedIndex === index ? "white" : "#333333",
                }}
              >
                {item.day}
              </Typography>
            </Box>
          );
        })}

        <IconButton
          onClick={handleNext}
          disabled={startIndex + 5 >= allDates.length}
        >
          <ChevronRightIcon sx={{ color: "#333333", fontSize: 30 }} />
        </IconButton>
      </Stack>
    );
  };
  
  export default DateSlots;
  