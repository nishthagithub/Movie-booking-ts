import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Layout2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );


  const noNavbarFooterRoutes = ["/login", "/sign-up", "/sign-up2"];

  return (
    <>
      {!noNavbarFooterRoutes.includes(location.pathname) && <Navbar />}
      <Outlet />
      {!noNavbarFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

export default Layout2;
