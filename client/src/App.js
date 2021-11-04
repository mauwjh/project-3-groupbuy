import "./App.css";
import { Route, Redirect, Switch } from "react-router";

import ListingNew from "./Components/ListingNew";
import NaviBar from "./Components/Navibar";
import About from "./Components/About";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Listing from "./Components/Listing";
import Order from "./Components/Order";
import React, { useState } from "react";
import AuthApi from "./Utility/AuthApi";
import ListingEdit from "./Components/ListingEdit";
import User from "./Components/User";
import SignUp from "./Components/SignUp";
import SignUpBuyer from "./Components/SignUpBuyer";
import SignUpSeller from "./Components/SignUpSeller";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import "@fontsource/mulish/300.css";
import "@fontsource/mulish/400.css";
import "@fontsource/mulish/500.css";
import "@fontsource/mulish/700.css";

let theme = createTheme({
  typography: { 
    fontFamily: "mulish, Arial",
    body1: {
      color: "#084c61",
    },
    button: {
      textTransform: "none",
      fontSize: "15px",
      padding: "5px",
      marginLeft: "5px",
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: "#83c5be",
      light: "#a8acbd",
      dark: "#a8acbd",
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  const [auth, setAuth] = useState({ session: false, userInfo: {} });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AuthApi.Provider value={{ auth, setAuth }}>
          <NaviBar />
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signup/buyer" component={SignUpBuyer} />
            <Route exact path="/signup/seller" component={SignUpSeller} />
            <Route path="/listing/new">
              <ListingNew />
            </Route>
            <Route exact path="/about" component={About}></Route>
            <Route path="/listing/:id/edit">
              <ListingEdit />
            </Route>
            <Route path="/listing/:id">
              <Listing />
            </Route>
            <Route path="/order/:id">
              <Order />
            </Route>
            <Route path="/user/:id">
              <User />
            </Route>
          </Switch>
        </AuthApi.Provider>
      </div>
    </ThemeProvider>
  );
}
export default App;
