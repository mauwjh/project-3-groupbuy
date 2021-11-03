import React from "react";
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


const theme = createTheme();

export default function SignUpBuyer() {
  let history = useHistory();

  
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
        console.log(response);
        history.push("/login"); //or create listing? 
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
            backgroundImage: "url(https://source.unsplash.com/random)",
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
                label="Key In Your Name"
                name="username"
                autoFocus
                error
                helperText="Please complete"
              />
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
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
