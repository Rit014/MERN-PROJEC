import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Box
} from "@mui/material";
import { DarkMode, LightMode, Menu as MenuIcon } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";

const Component = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const GradientLogo = styled(Typography)`
  font-size: 28px;
  font-weight: bold;
  background: linear-gradient(135deg, #b0e0e6 0%, #4682b4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  cursor: pointer;
`;

const DesktopLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  "& > a": {
    padding: "20px",
    color: theme.palette.text.primary,
    textDecoration: "none",
    transition: "color 0.3s",
    "&:hover": {
      color: "#4682b4", // Highlight color on hover
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& > a": {
      color: theme.palette.mode === "dark" ? "#ffffff" : theme.palette.text.primary,
    },
  },
}));

const Header = ({ darkMode, setDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate(); 


  const handleLogout = () => {
    // Remove tokens from localStorage (or cookies if stored there)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

   
    document.cookie = "refreshToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";

    navigate("/login"); 
  };


  const navItems = [
    { label: "Home", path: "/" },
    { label: "Logout", path: "/login", onClick: handleLogout },
  ];

  return (
    <>
      <Component position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <GradientLogo variant="h6">Comina-X</GradientLogo>
          </Link>

          {isMobile ? (
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <DesktopLinks>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={item.onClick} // Make sure to handle logout in the onClick
                >
                  {item.label}
                </Link>
              ))}
              <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ ml: 2 }}>
                {darkMode ? (
                  <DarkMode sx={{ color: "#FFDD44" }} />
                ) : (
                  <LightMode sx={{ color: "#FFA500" }} />
                )}
              </IconButton>
            </DesktopLinks>
          )}
        </Toolbar>
      </Component>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 200 }}>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.label}
              component={Link}
              to={item.path}
              onClick={() => {
                setDrawerOpen(false);
                item.onClick && item.onClick(); 
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  sx: {
                    color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  },
                }}
              />
            </ListItem>
          ))}
          <ListItem>
            <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ ml: 1 }}>
              {darkMode ? (
                <DarkMode sx={{ color: "#FFDD44" }} />
              ) : (
                <LightMode sx={{ color: "#FFA500" }} />
              )}
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
