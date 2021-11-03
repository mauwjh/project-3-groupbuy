import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Stack from "@mui/material/Stack";

import axios from "axios";
import AuthApi from "../Utility/AuthApi";

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
  const authApi = useContext(AuthApi);
  const [warn, setWarn] = useState(0);

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
          if (response.data.auth) {
            console.log(
              "Am I logged in?",
              response.data,
              response.data.message,
              response.data.userInfo
            );
            authApi.setAuth({
              session: response.data.auth,
              userInfo: response.data.userInfo,
            });
            setWarn(true);
            setTimeout(function () {
              window.history.back();
            }, 1300);
          } else {
            setWarn(false);
            console.log(response.data.message);
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
                {warn === 0 ? (
                  <Alert
                    variant="outlined"
                    severity="info"
                    style={{ display: "none" }}
                  >
                    Nothing
                  </Alert>
                ) : warn === true ? (
                  <Alert
                    variant="outlined"
                    severity="success"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Successfully Logged In!
                  </Alert>
                ) : (
                  <Alert variant="outlined" severity="error">
                    Username or Password is invalid.
                  </Alert>
                )}
            <Grid container>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
