import { createTheme } from "@mui/material";

const theme = createTheme({
    breakpoints:{
        values:{
            xs: 0,    // Extra small devices
            sm: 600,  // Small devices (tablets)
            md: 960,  // Medium devices (small laptops)
            lg: 1280, // Large devices (desktops)
            xl: 1920, // Extra large screens 
        }
    }
});
export default theme;