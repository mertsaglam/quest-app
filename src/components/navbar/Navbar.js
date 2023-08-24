import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


function Navbar(){
    const linkStyle = {textDecoration: "none", // Remove underline
    boxShadow:"none", // Change text color
   color:"white", // Add spacing between links
    }
    let userId = 1;
    return(<div>
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
            <MenuIcon><Link  to = {{pathname: '/users/' + userId}}>User</Link></MenuIcon>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,textAlign:"left" }}>
          <Link style={linkStyle} className="link" to="/">Home from navbar</Link>
          </Typography>
          <Typography ><Link style={linkStyle} to = {{pathname: '/users/' + userId}}>User</Link></Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
    </div>
    
    )
}

export default Navbar;