import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";

function Navbar() {
  const linkStyle = {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  };

  // Get user ID and login status from localStorage
  const userId = localStorage.getItem("currentUser");
  const isLoggedIn = userId !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("username");
    localStorage.removeItem("tokenKey");
    //go to home page
    navigate("/");
    window.location.reload(); // Optional: reload the page to reflect changes
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon>
                <Link to={{ pathname: "/users/" + userId }}>User</Link>
              </MenuIcon>
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "left" }}
            >
              <Link style={linkStyle} className="link" to="/">
                Home from navbar
              </Link>
            </Typography>
            {isLoggedIn ? (
              <>
                <IconButton color="inherit">
                  <Link style={linkStyle} to={{ pathname: "/users/" + userId }}>
                    <PersonIcon />
                    Profile
                  </Link>
                </IconButton>
                <IconButton color="inherit" onClick={handleLogout}>
                  <LockOpenIcon />
                  Logout
                </IconButton>
              </>
            ) : (
              <>
                <Button color="inherit">
                  <Link style={linkStyle} to="/auth">
                    Login
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link style={linkStyle} to="/auth">
                    Register
                  </Link>
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;
