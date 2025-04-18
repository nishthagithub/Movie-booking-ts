import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
} from "@mui/material";
import ASSETS from "../../Assets";
import { Link, useSearchParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { addStep2Data } from "../../store/features/AuthSlice";
import { RootState } from "../../store/store";
import axios from "axios";

const SignUp2 = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const location = useLocation();
  const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state:RootState) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    phnnumber: "",
    password: "",
    confirmPassword: "",
  });
  // console.log(userData)
  console.log(isAuthenticated);
  console.log(formData);

  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const emailFromURL = searchParams.get("email");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      email: user?.email  || "",
      phnnumber: user?.phnnumber || "",
    }));
  }, [user]);

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleCpasswordChange = (e: any) => {
    setCpassword(e.target.value);
  };
  const API_URL = process.env.REACT_APP_URL;

  const handleSubmit = async() => {
    if (!password || !cpassword) {
      setError("Both fields are required.");
      return;
    }

    if (password !== cpassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/api/user/`,
        {
          email: formData.email,
          phnnumber: formData.phnnumber,
          password: password,
          confirmpassword: cpassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },  
          withCredentials: true,
        }
      );
      console.log("response", response);
      alert("Signup Successfull");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed.Email already exists or phone number already exists ");
      navigate("/sign-up");
    }

  };

  return (
    <>
      <Box>
        <Link
          to="/sign-up"
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
          backgroundImage: `url(${ASSETS.images.SIGNUPPIC2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          justifyContent: { xs: "center", md: "flex-end" },
          alignItems: "center",
          padding: isMobile ? "1rem" : "2rem",
        }}
      >
        {/* Signup Container */}
        <Box
          sx={{
            width: { xs: "100%", sm: "500px", md: "656px" },
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
              Signup to TIX ID
            </Typography>
            {name}

            {/* Password Input */}
            <Typography variant="body1" textAlign="start" mt={1}>
              Password
            </Typography>
            <TextField
              variant="standard"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter Password"
              sx={{ mb: 1 }}
              type="password"
            />

            {/* Confirm Password Input */}
            <Typography variant="body1" textAlign="start" mt={1}>
              Confirm Password
            </Typography>
            <TextField
              variant="standard"
              fullWidth
              value={cpassword}
              onChange={handleCpasswordChange}
              placeholder="Confirm Password"
              sx={{ mb: 1 }}
              type="password"
            />

            {/* Error Message */}
            {error && (
              <Typography
                color="error"
                sx={{ mt: 1, textAlign: "start", fontSize: "0.9rem" }}
              >
                {error}
              </Typography>
            )}

            {/* Buttons */}
            <Box mt={2} display="flex" flexDirection="column" gap={1}>
              <Button
                variant="outlined"
                sx={{
                  bgcolor: "#1A2C50",
                  color: "white",
                  border: "1px solid black",
                  width: { xs: "250px", sm: "350px", md: "423px" },
                  height: isMobile ? "40px" : "48px",
                  marginTop: "2rem",
                }}
                onClick={handleSubmit}
              >
                Sign Up Now
              </Button>

              <p
                style={{
                  textAlign: "start",
                  fontSize: "0.8rem",
                  marginTop: "1.5rem",
                  color: "#5A637A",
                }}
              >
                *By signing up, I agree to the policies of TIX ID
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUp2;
