import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {  Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

const AuthLayout = () => {
  console.log("object")
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("isAuthenticated") || '{}');
  

  
  
  const isAuthenticated =  useSelector((state:RootState) => state.auth.isAuthenticated);
  if(userData){
    navigate('/')
  }

 

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
