import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { NotificationsNoneOutlined } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import ASSETS from "../Assets/index";
import { Link, useNavigate } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "Tiket Saya", path: "/transaction" },
  { name: "Tix ID News", path: "/tid-news" },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavbarAft = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [mobileMenu, setMobileMenu] = React.useState<null | HTMLElement>(null);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");



  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenu(event.currentTarget);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenu(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white", color: "black",top:0,zIndex: 1000  }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img src={ASSETS.images.LOGO} alt="Logo" style={{ height: "32px", width: "auto" }} />
          </Box>

          {isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Notification Icon */}
              <IconButton color="inherit">
                <NotificationsNoneOutlined sx={{ width: "1.5rem", height: "1.5rem" }} />
              </IconButton>

              {/* Login Button */}
              <Link to="/login">
              <Button
                sx={{
                  fontSize: "1rem",
                  color: "rgba(242, 196, 111, 1)",
                  bgcolor: "rgba(26, 44, 80, 1)",
                  width: "4rem",
                  height: "2rem",
                }}
              >
                Login
              </Button>
              </Link>
              {/* Mobile Menu Icon */}
              <IconButton onClick={handleOpenMobileMenu} color="inherit">
                <MenuIcon sx={{ fontSize: "1.8rem" }} />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => navigate(page.path)}
                  sx={{ color: "black", fontWeight: 500, fontSize: "1rem" }}
                >
                  {page.name}
                </Button>
              ))}

              <Typography
                sx={{
                  color: "rgba(157, 168, 190, 1)",
                  width: "2px",
                  height: "24px",
                }}
              >
                |
              </Typography>

              <IconButton color="inherit">
                <NotificationsNoneOutlined sx={{ width: "1.7rem", height: "1.7rem" }} />
              </IconButton>
               <Link to="/sign-up">
              <Button sx={{ fontSize: "1rem", color: "black" }}>Sign Up</Button>
              </Link>
              <Link to="/login">
              <Button
                sx={{
                  fontSize: "1rem",
                  color: "rgba(242, 196, 111, 1)",
                  bgcolor: "rgba(26, 44, 80, 1)",
                  width: "5rem",
                  height: "2.5rem",
                }}
              >
                Login
              </Button>
              </Link>
            </Box>
          )}
        </Toolbar>

        {/* Mobile Menu */}
        <Menu anchorEl={mobileMenu} open={Boolean(mobileMenu)} onClose={handleCloseMobileMenu}>
          {pages.map((page) => (
            <MenuItem
              key={page.name}
              onClick={() => {
                navigate(page.path);
                handleCloseMobileMenu();
              }}
            >
              {page.name}
            </MenuItem>
          ))}

          <MenuItem onClick={handleCloseMobileMenu}>
            <Button sx={{ width: "100%", color: "black", fontSize: "1rem" }}>Sign Up</Button>
          </MenuItem>
        </Menu>

        {/* User Profile Menu */}
        <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Container>
    </AppBar>
  );
};

export default NavbarAft;
