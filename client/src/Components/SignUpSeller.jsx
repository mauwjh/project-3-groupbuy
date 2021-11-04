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

export default function SignUpSeller() {
  let history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    //data
    console.log({
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      business_name: data.get("business_name"),
      website: data.get("website"),
      contact_number: data.get("contact_number"),
    });
    axios
      .post("/api/users/seller", {
        usertype: "seller",
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
        payment_details: "Nil",
        business_name: data.get("business_name"),
        website: data.get("website"),
        contact_number: data.get("contact_number"),
        address: "Nil",
        name: "Nil",
      })
      .then((response) => {
        console.log(response);
        history.push("/login");
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
            backgroundImage: "url(https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80)",
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
                  Seller
                </Typography>
              </Box>
            </div>

            <Box
              component="form"
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
                  <b> Business Details </b>
                </Box>
              </div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="businessName"
                label="Business Name"
                name="business_name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="website"
                label="Business Website"
                name="website"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="contact_number"
                label="Contact Number"
                name="contact_number"
                autoFocus
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
