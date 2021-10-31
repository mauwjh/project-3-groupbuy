import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link as RouterLink } from "react-router-dom";
import { Link } from '@mui/material';


export default function NaviBar() {
  return (
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
            <MenuIcon />
          </IconButton>
          <Link component={RouterLink} to="/" sx={{ flexGrow: 1, color: "white" }} underline="none">
            <Typography variant="h6" component="div" >
            Home
          </Typography></Link> 
         {/* <Link sx={{ flexGrow: 1 }} ><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography></Link> */}
             <Button   component={RouterLink}
              to="/listing/new" color="inherit">New</Button>
           <Button   component={RouterLink}
              to="/listing/about" color="inherit">About</Button>
          <Button   component={RouterLink}
              to="/listing/Login" color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}