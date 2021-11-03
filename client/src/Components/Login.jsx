import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import AuthApi from "../Utility/AuthApi";
import { useHistory } from "react-router-dom";
import { Modal } from "@material-ui/core";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function myFunction() {
    //document.getElementById("para").style.color = "red";
    //document.getElementById("para").innerHTML =
     // "'You have keyed in an Invalid UserName or PassWord'";
   handleOpen(); // this is for modal
  }
  const authApi = useContext(AuthApi);

  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    axios
      .post("/api/users", {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then(
        (response) => {
          // console.log("Response Data", response.data);
          console.log("UserInfo", response.data);
          if (response.data.auth) {
            console.log(
              "Am I logged in?",
              response.data.message,
              response.data.userInfo._doc
            );
            authApi.setAuth({
              session: response.data.auth,
              userInfo: response.data.userInfo._doc,
            });
            history.push("/");
          } else {
            console.log(response.data.message);
            myFunction();
            //alert("You have keyed in an Invalid UserName or PassWord");
          }
        },
        (error) => {
          console.log("Error", error);
        }
      );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
           {/* <p id="para">Please login</p> */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                 I am a Modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, color: "red"  }}>
                 You have keyed in the wrong email add or password !!!
                </Typography>
              </Box>
            </Modal>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
