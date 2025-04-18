import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
interface LayoutProps {
  isLogggedIn: boolean;
}
const isLogggedIn: boolean = !!localStorage.getItem("userData");

const Layout = () => {
  const {isAuthenticated} = useSelector(
    (state: RootState) => state.auth
  );


  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
