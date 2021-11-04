import React from "react";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState, useContext } from "react";
import {Link} from 'react-router-dom'
import AuthApi from "../Utility/AuthApi"
import ListingNew from "./ListingNew";

const URL = "/api/listings";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const theme = createTheme();

export default function Home() {
  const [alllistings,setAllListings] = useState([])
  const value = useContext(AuthApi)
  console.log("value",value)
  
  useEffect(()=>{
    const fetchData = async () =>{
    const res = await fetch(URL);
    console.log(res)
    const data = await res.json();
    console.log("hello")
    console.log(data)
    setAllListings(data)
    };
    fetchData();
  },[])

  return (
    <>
    <div style={{display: 'none'}}>

      <ListingNew />
    </div>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 3,
            pb: 1,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome to our GroupBuy Shop
            </Typography>
            <Typography
              variant="h7"
              align="center"
              color="text.secondary"
              paragraph
            >
              GroupBuy keeps your tummies happy and your bodies healthy! Some 
              Take a look at all the photos our members sent to #GroupBuysXXX because
              they are so happy to receive their orders at discounted prices !
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {alllistings.map((listings,key) => (
              <Grid item key={key} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    maxWidth: 400,
                    maxHeight: 600 
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 150,
                      maxHeight: 150
                      
                    }}
                    image={listings.img}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1  }}>
                    <Typography gutterBottom sx={{fontSize: 'clamp(0.8rem, 1.5vw, 1.2rem)', fontWeight: 'bold'}}>
                      {listings.name}
                    </Typography>
                    <Typography sx={{minHeight: 150, maxHeight: 150, overflow: 'hidden', textOverflow: 'ellipsis'}}>
                      {listings.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/listing/${listings._id}`} style={{textDecoration: 'none', margin: '0 auto'}}><Button size="small">View</Button></Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
      </>
  );
}
