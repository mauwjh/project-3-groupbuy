import React, { useContext } from "react";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import AuthApi from "../Utility/AuthApi";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function AccountMenu() {
  const session = useContext(AuthApi);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="primary"
      >
        <Typography>
          <AccountCircleIcon />
        </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          component={RouterLink}
          to={`/user/${session.auth.userInfo._id}`}
          color="inherit"
          onClick={handleClose}
        >
          My account
        </MenuItem>
        <br />
        <MenuItem
          component={RouterLink}
          to="/logout"
          color="inherit"
          onClick={() => {
            handleClose();
            session.setAuth(false);
            localStorage.clear();
            window.location.replace("/");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
