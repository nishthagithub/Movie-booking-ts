import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { NotificationsNoneOutlined } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import Assets from "../Assets/index";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";




function Navbar({ showHome = true }) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const email = localStorage.getItem("email");
  const [mobileMenu, setMobileMenu] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = !!localStorage.getItem("userData");
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    const isAuthenticated =localStorage.getItem('isAuthenticated') === "true"
      // useEffect(() => {
      //   const fetchAuthStatus = async () => {
      //     const authStatus = await checkAuth();
      //     setIsAuthenticated(authStatus);
      //     console.log(authStatus)
      //   };
      //   fetchAuthStatus();
      // }, []);


 const pages = [
   { name: "Home", path: "/" },
   ...(isAuthenticated ? [{ name: "My Tickets", path: "/transaction" }] : []),
   { name: "Tix ID News", path: "/tid-news" },
 ]

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenu(event.currentTarget);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenu(null);
  };

  const handleLogout = () => {
    const response = axios.post("http://localhost:8080/api/user/logout",{},{withCredentials: true});
    localStorage.removeItem("userData");
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "white", color: "black", top: 0, zIndex: 1000 }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src={Assets.images.LOGO}
              alt="Logo"
              style={{ height: "32px", width: "auto" }}
            />
          </Box>

          {isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton color="inherit">
                <NotificationsNoneOutlined
                  sx={{ width: "1.7rem", height: "1.7rem" }}
                />
              </IconButton>
              <Tooltip title="Profile">
                <Link to="/profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        background:
                          "linear-gradient(to right ,rgba(242, 196, 111, 1),rgba(198, 148, 63, 1))",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      A
                    </Avatar>
                  </IconButton>
                </Link>
              </Tooltip>
              <IconButton onClick={handleOpenMobileMenu} color="inherit">
                <MenuIcon />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  sx={{ color: "black", fontWeight: 500, fontSize: "1rem" }}
                >
                  <Link
                    to={page.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {page.name}
                  </Link>
                </Button>
              ))}
              {isAuthenticated ? (
                <Link to="/profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        background:
                          "linear-gradient(to right ,rgba(242, 196, 111, 1),rgba(198, 148, 63, 1))",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      {email ? email.charAt(0).toUpperCase() : "A"}
                    </Avatar>
                  </IconButton>
                </Link>
              ) : null}

              {isAuthenticated ? (
                <Button
                  onClick={handleLogout}
                  sx={{
                    fontSize: "1rem",
                    color: "white",
                    bgcolor: "grey",
                    width: "5rem",
                    height: "2.5rem",
                  }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => navigate("/login")}
                    sx={{
                      fontSize: "1rem",
                      color: "rgba(51, 51, 51, 1)",
                      bgcolor: "white",
                      width: "5rem",
                      height: "2.5rem",
                      ":hover": {
                        bgcolor: "grey",
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate("/sign-up")}
                    sx={{
                      fontSize: "1rem",
                      color: "rgba(242, 196, 111, 1)",
                      bgcolor: "rgba(26, 44, 80, 1)",
                      width: "5rem",
                      height: "2.5rem",
                    }}
                  >
                    Signup
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>

        <Menu
          anchorEl={mobileMenu}
          open={Boolean(mobileMenu)}
          onClose={handleCloseMobileMenu}
        >
          {pages.map((page) => (
            <MenuItem key={page.name} onClick={handleCloseMobileMenu}>
              <Typography textAlign="center">{page.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Container>
    </AppBar>
  );
}

export default Navbar;
