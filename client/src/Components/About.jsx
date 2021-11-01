import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Container, ListItem } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import List from "@mui/material/List";

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

export default function About() {
  const header = (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: { xs: "center", md: "flex-start" },
      m: 5,
      minWidth: { md: 350 },
     color: "#303F9F"
    }}
  ><Typography variant="h4">Thanks for popping by </Typography>
  </Box>);
  const content = (
  
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          m: 5,
          minWidth: { md: 350 },
        }}
      >
        <Typography variant="h6">{`What is this app about? Looking @ different countries' :`}</Typography>
        {
          <span>
            <Box sx={{ pl:2 }}>
              <List>
                <ListItem>- Flags</ListItem>
                <ListItem>
                  - Identifying their Capital, yes sometimes we mistake their
                  city as their capital
                </ListItem>
                <ListItem>
                  - Check out their Maps, sorry Asia countries only
                </ListItem>
              </List>
              <ListItem>{">"} and ... Currency</ListItem>
            </Box>
          </span>
        }
      </Box>
  
  );
  return (
    <Grid container>
      <Grid item xs={8} sx={{ py: 5 }}>
        {header}
        {content}
      </Grid>
      <Divider orientation="vertical" flexItem></Divider>
      <Grid item xs sx={{ py: 8}}>
        <Container maxWidth="sm">
          <Typography variant="h5" align="center">
            Quote of the Day
          </Typography>
          <Box
            sx={{
              m: 3,
              p: 1,
              border: 3,
              borderColor: "#EC407A",
              borderRadius: 5,
            }}
          >
    
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
