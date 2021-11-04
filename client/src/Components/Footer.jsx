import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';


function Footer() {

  const URL = "https://techcrunch.com/wp-content/uploads/2021/08/pokemon-legends-arceus.jpeg?w=730&crop=1"
  return (
    <Paper
          sx={{
              position: 'relative',
              backgroundColor: 'grey.800',
              color: '#fff',
              mb: 4,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: `url(${URL})`
              
          }}
    >
   
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
             Help Center
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              How to Buy
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              How to Buy
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Footer;
