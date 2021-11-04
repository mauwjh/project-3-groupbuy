import React from "react";
import { Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/material";


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

export default function SignUp() {
  const [userType, setUserType] = React.useState("")

  const handleClick1 = () => {
    setUserType("buyer")
    console.log(userType)
  };
   
  const handleClick2 = () => {
    setUserType("seller")
    console.log(userType)
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
            backgroundImage: "url(https://images.unsplash.com/photo-1530977875151-aae9742fde19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80)",
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
              my: 20,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="div" variant="h5">
              Please select if you are a <Box sx={{ color: '#DE5045' }}>Buyer</Box>  or a <Box sx={{ color: '#DE5045' }}>Seller</Box>
            </Typography>
            <Stack spacing={4} sx= {{my:5}}>
              <Button  name = "buyer" onClick={handleClick1} component= { Link} href= "signup/buyer" color="inherit" variant="outlined">
                Buyer
                {/* Post usertype : buyer*/}
              </Button>
              <Button name = "seller" onClick={handleClick2} component= { Link} href= "signup/seller" color="inherit" variant="outlined">
                Seller
                {/* Post usertype : seller*/}
          </Button> 
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

