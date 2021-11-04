import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SetMeal from "@mui/icons-material/SetMeal";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert"


const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3f51b5',
    },
  
    text: {
      primary: '#6666d8',
      secondary: '#8c51ec',
    },
  }
});

export default function SignUpBuyer() {
  let history = useHistory();
  const [warn, setWarn] = useState(0)
  const [errorMessage, setErrorMessage] = useState()

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      payment_details: data.get("payment_details"),
    });
    axios
      .post("/api/users/buyer", {
        usertype: "buyer",
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
        payment_details: data.get("payment_details"),
        name: "Nil",
        address: "Nil",
        business_name: "Nil",
        website: "Nil",
        contact_number: "Nil",
      })
      .then((response) => {
        console.log("RESPONSE",response.data);
        console.log("MESSAGE",response.data.message)

        if (response.data.createUser) {
          setWarn(true);
          setErrorMessage(response.data.message)
          setTimeout(function () {
            history.push("/login");
        }, 1000);
        }
        else {
          setErrorMessage(response.data.message)
          setWarn(false)
        }

        console.log(response);

      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  p: 1,
                  m: 1,
                  bgcolor: "background.paper",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <SetMeal />
                </Avatar>
                <Typography variant="h4" component="div" sx={{ pl: 1 }}>
                  Buyer
                </Typography>
              </Box>
            </div>
            <Box
              component="form"
              Validate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <div style={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                    justifyContent: "center",
                  }}
                >
                  <b> Personal Details </b>
                </Box>
              </div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Key In Your Username"
                name="username"
                inputProps={{ maxLength:30}}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                inputProps={{ maxLength:40}}
                autoComplete="email"
                type="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                inputProps={{ maxLength:20}}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <div style={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                    justifyContent: "center",
                  }}
                >
                  <b> Payment Details </b>
                </Box>
              </div>
              <TextField
                margin="normal"
                id="payment_details"
                name="payment_details"
                inputProps={{ maxLength:40}}
                label="Credit Card Details"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
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
                    {errorMessage}
                  </Alert>
                ) : (
                  <Alert variant="outlined" severity="error">
                    {errorMessage}
                  </Alert>
                )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
