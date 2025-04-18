import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, useMediaQuery, 
} from '@mui/material';
import { useNavigate,Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ASSETS from '../../Assets';
import { addStep1Data } from '../../store/features/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';


const SignUp = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', phnnumber: '' });
  const [errors, setErrors] = useState({ email: '', phnnumber: '' });
  const {isAuthenticated} = useSelector((state:RootState)=>{
    return state.auth;
  })
  const newAuth = localStorage.getItem('isAuthenticated')
 
  console.log(isAuthenticated)


  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation logic
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(value)) {
       setErrors({...errors,email:"Please enter a valid email address."});
     } else {
       setErrors({ ...errors, email: "" });
     }

    if (name === 'phnnumber') {
      const phoneRegex = /^\d{10}$/; // Exactly 10 digits
      if (!phoneRegex.test(value)) {
        setErrors({ ...errors, phnnumber: 'Phone number must be exactly 10 digits.' });
      } else {
        setErrors({ ...errors, phnnumber: '' });
      }
    }
  };
  

  const handleSignup = () => {
    if (
      !formData.email ||
      !/\S+@\S+\.\S+/.test(formData.email) || // Email validation
      !/^\d{10}$/.test(formData.phnnumber) ||
      errors.email ||
      errors.phnnumber
    ) {
      alert("Please fill in valid details before proceeding.");
      return;
    }

    const userData = {
      ...formData,
    };

    console.log("User Data:", userData);
    console.log(isAuthenticated);
console.log(userData.email);
    dispatch(
      addStep1Data({
        email: formData.email,
        phnnumber: formData.phnnumber,
      })
    );
    alert("Signup successful");
    navigate(`/sign-up2?email=${encodeURIComponent(formData.email)}`);
  };

   
  return (
   
    <>
    <Box>
    <Link to="/login" style={{ textDecoration: "none", position: "absolute", left: "20px", top: "5%", transform: "translateY(-50%)", display: "flex", alignItems: "center", color: "white", fontSize: "1rem", fontWeight: "bold" }}>
        <ArrowBackIcon sx={{ fontSize: "2rem", marginRight: "8px" }} />
        Back
      </Link>
    </Box>
   
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundImage: `url(${ASSETS.images.SIGNUPPIC})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        justifyContent: {xs:"center",md:"flex-end"},
        alignItems: "center",
        padding: isMobile ? "1rem" : "2rem",
      }}
    >
      {/* Login Container */}
      <Box
        sx={{
          width: {xs:"100%", sm:"500px",md:"656px"},
          backgroundColor: "white",
          padding:isMobile? "1rem": "2rem",  
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          height:{xs:"400px",sm:"500px",md:"650px"}
        }}
      >
        <Box sx={{ maxWidth:{xs:"250px",sm:"350px" ,md:"420px"}, width: "100%",
        marginLeft:isMobile? "30px":"40px" }}>
        <Typography variant="h5" fontWeight="bold" mb={2} textAlign="start" marginTop="2rem" color='#000000' fontSize="2rem" marginBottom={4}>
          Signup to TIX ID
        </Typography>

        {/* Phone Number Input */}
        <Typography variant="body1" textAlign="start" mt={1} >
          Email
        </Typography>
        <TextField
          variant="standard"
          fullWidth
          margin="normal"
          placeholder="Enter Email"
          name='email'
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{mb:1}}
        />

<Typography variant="body1" textAlign="start" sx={{
  marginTop:"1rem"
}} >
          Phone Number
        </Typography>
        <TextField
          variant="standard"
          fullWidth
          margin="normal"
          placeholder="+91  |   Enter Phone Number"
          name="phnnumber"
          value={formData.phnnumber}
          onChange={handleChange}
          error={!!errors.phnnumber}
          helperText={errors.phnnumber}
          sx={{mb:1}}
        />

        {/* Buttons */}
        <Box mt={2} display="flex" flexDirection="column" gap={1}>
          
          <Button variant="outlined" sx={{bgcolor:"#1A2C50",   color:"white",border:"1px solid black",  width:{xs:"250px",sm:"350px",md:"423px"},height:isMobile? "40px" : "48px",marginTop:"2rem"}}
          onClick={handleSignup}
          
        
          >
          Sign Up Now
          </Button>
          
          <p style={{
            textAlign:"start",
            fontSize: "0.8rem",
            marginTop:"10.5rem",
            color:"#000000"
          }}>2021 TIX ID - PT Nusantara Elang Sejahtera.</p>
          </Box>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default SignUp;
