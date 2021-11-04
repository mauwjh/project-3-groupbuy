import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AuthApi from "../Utility/AuthApi";

export default function NaviBar() {
  const session = useContext(AuthApi);
  console.log("session", session);

  const clearCache = () =>{
    session.setAuth(false)
    localStorage.clear()
    window.location.replace("/")
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px' }}>
      <AppBar position="static" >
        <Toolbar>
          <div style={{display: 'flex',  flex: 1, justifyContent: 'left'}}>
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            sx={{ color: "white",}}
          >
            <Button
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <StorefrontIcon />
              <Typography
                variant="h6"
                component="div"
                sx={{ pl: 2, textTransform: "none" }}
              >
                Home
              </Typography>
            </Button>
          </Link>
          </div>
          <Typography
            variant="h6"
            component="div"
            sx={{ flex: 1, color: "white", minHeight: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            Group Buy
          </Typography>
          {/* <Link sx={{ flexGrow: 1 }} ><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography></Link> */}
          <div style={{display: 'flex', flex: 1, justifyContent: 'right'}}>  
          {session.auth.userInfo.usertype === 'seller' ? 
          <Button component={RouterLink} to="/listing/new" color="inherit">
            New
          </Button> : null }
          {session.auth.session === false ? (
              <Button component={RouterLink} to="/login" sx={{ color: "white" }}>
              Login
            </Button>
          ) : (
            <Button component={RouterLink} to="/logout" color="inherit" onClick={clearCache}>
              Logout
            </Button>
          )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}