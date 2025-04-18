import React, { useState, ChangeEvent, useEffect } from "react";
import { Box, Avatar, IconButton, Typography, Button } from "@mui/material";
import axios from "axios";


const ProfilePage: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [userIdd, setUserId] = useState<string | null>(null);
  const [fileData, setFileData] = useState<File | null>(null);
  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    setUserId(userId);
    setEmail(email);
  },[])
    const API_URL = process.env.REACT_APP_URL;

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    const fetchUserProfile=async()=>{
        try {
            const response = await axios.get(
              `${API_URL}/api/user/profile/${userId}`
            );
            const {email,profilePicture} = response.data;
            setEmail(email);
            if(profilePicture){
                setPreview(profilePicture);
            }
        } catch (error) {
            console.error("Failed to fetch user profile", error);
        }
    }
    if(userId){
        fetchUserProfile();
    }
  },[]);
 

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setFileData(file);
      console.log("file",file)
    }
  };
  const handleSaveProfile =async()=>{
    console.log("save pro");
    console.log(setFileData, userIdd);
    if(!fileData || !userIdd){
        alert("Please select a file and enter your user id");
        return;
    }
    const formData = new FormData();
   
    formData.append("profilePicture", fileData);
    formData.append("userId", userIdd);
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/user/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Profile image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload profile image.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f7fc",
        paddingX: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: 4,
          width: "100%",
          maxWidth: "500px",
          boxShadow: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" component="h2" mb={3} fontWeight="bold">
          Update Your Profile
        </Typography>

        <Box mb={3}>
          <Typography variant="body1" color="textSecondary" mb={2}>
            Upload your profile picture by clicking the avatar below.
          </Typography>
          <label htmlFor="profilePic" style={{ cursor: "pointer" }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                marginX: "auto",
                borderRadius: "50%",
                background: "linear-gradient(to right, #f2c46f, #c6943f)",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.5rem",
                border: "4px solid #e0e0e0",
                position: "relative",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
              alt="Profile Preview"
              src={preview || ""}
            >
              {!preview && email?.[0]?.toUpperCase()}
            </Avatar>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 2,
                right: 2,
                backgroundColor: "white",
                borderRadius: "50%",
                padding: 1,
                boxShadow: 2,
              }}
            ></Box>
          </label>
        </Box>

        <Typography variant="body2" color="textSecondary" mb={2}>
          Your email (can't be changed):
        </Typography>

        <input
          type="email"
          value={email || ""}
          readOnly
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            backgroundColor: "#f8f8f8",
            textAlign: "center",
            marginBottom: "1rem",
            fontWeight: "bold",
            color: "#555",
          }}
        />

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveProfile}
            disabled={loading}
            fullWidth
            sx={{
              padding: "12px",
              borderRadius: "8px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#c6943f",
              },
            }}
          >
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
