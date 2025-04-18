import React, { useState } from "react";

import { Typography, InputBase, Button, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { setCategory,setSearch } from "../../store/features/NewsSlice";
import { RootState } from "../../store/store";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Card2 from "../../components/Card2";
import NewsList from "./NewsInfo";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "576px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  padding: "0 12px",
  border: `1px solid ${theme.palette.grey[400]}`,
}));

const SearchIconWrapper = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "auto",
}));


const News = () => {
  
  const [activeButton, setActiveButton] = useState(null);
  
  const handleClick = (buttonLabel: any) => {
    setActiveButton(buttonLabel);
    
  };
  const { selectedCategory,searchQuery } = useSelector((state:RootState) => state.news);
 
  const dispatch = useDispatch();
  const handleChange = (event:any) => {
          dispatch(setCategory(event.target.value));
        };
        const handleSearchChange = (event:any) => {
          dispatch(setSearch(event.target.value));
        };

  return (
    <div>
   
      <Typography sx={{ 
        marginLeft:{ xs:"1rem",md:"4rem"} }}>
        <Typography
          sx={{ fontSize: "2rem", fontWeight: 700, marginTop: "2rem" }}
        >
          TIX ID NEWS
        </Typography>
        <Typography sx={{ fontSize: "1rem", lineHeight: "1.5rem" }}>
          Latest news about the world of cinema for you!
        </Typography>
      </Typography>

      {/* Search Bar */}
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft:{ xs:"1rem",md:"4rem"},
          marginTop: "1rem",
        }}
      >
        <Search>
        <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ flex: 1 }}
          />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </Search>
        <Box sx={{ minWidth: 120, marginLeft: "10px" }}>
          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-label">Sortir</InputLabel> */}

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategory}
              onChange={handleChange}
              displayEmpty
              sx={{
                textAlign: "end",
                background: "transparent",
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&:hover .MuiOutlinedInput-notchedOutline": { border: 0 },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 },
                "& .MuiSelect-select": {
                  padding: 0,
                },
              }}
            >
              <MenuItem disabled value="">
                Sortir
              </MenuItem>
              <MenuItem value={"spotlight"}>Spotlight</MenuItem>
              <MenuItem value={"news"}>News</MenuItem>
              <MenuItem value={"video"}>Video</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Typography>
      <Typography
        sx={{
          marginLeft:{ xs:"1rem",md:"4rem"},
          display: "flex",
          justifyContent: "flex-start",
          gap: "8px",
          flexWrap: "wrap",
          marginTop: "1rem",
        }}
      >
        {[
          "SpiderMan",
          "Batman",
          "Yowis Ben",
          "Ghostbusters",
          "House of Gucci",
          "Dune",
        ].map((label) => (
          <Button
            key={label}
            onClick={() => handleClick(label)}
            sx={{
              borderRadius: "23px",
              border:
                activeButton === label
                  ? "1px solid black"
                  : "1px solid rgba(143, 152, 170, 1)",
              color:
                activeButton === label ? "black" : "rgba(143, 152, 170, 1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                color: "black",
                border: "1px solid black",
              },
            }}
          >
            {label}
          </Button>
        ))}
      </Typography>
      
      <NewsList/>
     
      <Card2 />
      
    </div>
  );
};

export default News;
