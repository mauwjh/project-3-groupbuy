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
import Footer from "./Footer";
import ListingNew from "./ListingNew";


const URL = "/api/listings";


// const theme = createTheme();

export default function Home() {
  const [alllistings,setAllListings] = useState([])
  const [update, setUpdate] = useState(true)
  const value = useContext(AuthApi)
  console.log("value",value)

  const handleUpdate = () => {
    update ? setUpdate(false) : setUpdate(true)
  }
  
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
  },[update])

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
            ><Button
            onClick={handleUpdate}>
              GroupBuy keeps your tummies happy and your bodies healthy! 
              Take a look at all the photos our members sent to #GroupBuysXXX because
              they are so happy to receive their orders at discounted prices !
              </Button>
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
                    <Typography gutterBottom sx={{fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', fontWeight: 'bold'}}>
                      {listings.name}
                    </Typography>
                    <Typography sx={{fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', minHeight: 150, maxHeight: 150, overflow: 'hidden', textOverflow: 'ellipsis'}}>
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
          
        </Typography>
        
       {/* <Footer/> */}
      </Box>
      {/* End footer */}
      </>
  );
}
