import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";

export default function NaviBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link component={RouterLink} to="/" underline = "none" sx={{ color: "white" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <StorefrontIcon />
              <Typography variant="h6" component="div" sx={{ pl: 2 }} >
                Home
              </Typography>
            </IconButton>
              </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "white" }}
          >
            Group Buy
          </Typography>
          {/* <Link sx={{ flexGrow: 1 }} ><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography></Link> */}
          <Button component={RouterLink} to="/listing/new" color="inherit">
            New
          </Button>
          <Button component={RouterLink} to="/about" color="inherit">
            About
          </Button>
          <Button component={RouterLink} to="/login" color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
