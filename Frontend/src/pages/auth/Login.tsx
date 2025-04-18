import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ASSETS from "../../Assets";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { loginSuccess } from "../../store/features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import axios from "axios";

const Login = () => {
  // console.log("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch();

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

   const API_URL = process.env.REACT_APP_URL;
   console.log("API_URL:", process.env.REACT_APP_API_URL); 


  // const newauth = localStorage.getItem("isAuthenticated") === "true";
  const navigate = useNavigate();

  const handleLogin = async() => {
    if(!email && !password){
      alert("Please fill in all fields");
    }
    try {
      const response = await axios.post(`${API_URL}/api/user/login`,{
        email,
        password
      },{
        headers:{
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("response",response.data);
      
    const { user } = response.data;
    const userID = user.userID;
    const userEmail =user.email;

    dispatch(loginSuccess({ userID: user.userID, email: user.email }));

      // console.log(response.data.userID);
      alert("Login Successfull");
      navigate("/");
    } catch (error) {
      console.log("error",error)
      alert("Login failed")
    }
   
  };


  return (
    <>
      <Box>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            position: "absolute",
            left: "20px",
            top: "5%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            color: "white",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          <ArrowBackIcon sx={{ fontSize: "2rem", marginRight: "8px" }} />
          Back
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          backgroundImage: `url(${ASSETS.images.LOGINPIC})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          justifyContent: { xs: "center", md: "flex-end" },
          alignItems: "center",
          padding: isMobile ? "1rem" : "2rem",
        }}
      >
        {/* Login Container */}
        <Box
          sx={{
            width: { xs: "100%", sm: "500px", md: "740px" },
            backgroundColor: "white",
            padding: isMobile ? "1rem" : "2rem",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            height: { xs: "400px", sm: "500px", md: "650px" },
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: "250px", sm: "350px", md: "420px" },
              width: "100%",
              marginLeft: isMobile ? "30px" : "40px",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={2}
              textAlign="start"
              marginTop="2rem"
              color="#000000"
              fontSize="2rem"
              marginBottom={4}
            >
              Login to TIX ID
            </Typography>

            {/* Phone Number Input */}
            <Typography variant="body1" textAlign="start" mt={1}>
             Email
            </Typography>
            <TextField
              variant="standard"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone Number"
              sx={{ mb: 1 }}
            />

            <Typography
              variant="body1"
              textAlign="start"
              sx={{
                marginTop: "1rem",
              }}
            >
              Password
            </Typography>
            <TextField
              label="Password"
              // sx={{mt:1}}
              variant="standard"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mt: 0.5 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Buttons */}
            <Box mt={2} display="flex" flexDirection="column" gap={1}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#1A2C50",
                  color: "white",
                  marginTop: "2.5rem",
                  width: { xs: "250px", sm: "350px", md: "423px" },
                  height: isMobile ? "40px" : "48px",
                }}
                onClick={handleLogin}
              >
                Login Now
              </Button>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#81899D",
                  margin: "0",
                }}
              >
                Don't have an account?
              </p>
              <Link to="/sign-up">
                <Button
                  variant="outlined"
                  sx={{
                    color: "#1A2C50",
                    border: "1px solid black",
                    width: { xs: "250px", sm: "350px", md: "423px" },
                    height: isMobile ? "40px" : "48px",
                  }}
                >
                  Sign Up Now
                </Button>
              </Link>
              <p
                style={{
                  textAlign: "start",
                  fontSize: "0.8rem",
                  marginTop: "5.5rem",
                  color: "#000000",
                }}
              >
                2021 TIX ID - PT Nusantara Elang Sejahtera.
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
