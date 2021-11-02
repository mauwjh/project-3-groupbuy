import "./App.css";
import { Route, Redirect, Switch } from "react-router";
import ListingNew from "./Components/ListingNew";
import NaviBar from "./Components/Navibar";
import About from "./Components/About";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Listing from "./Components/Listing";
import Order from "./Components/Order";
import React, { useState } from "react"
import AuthApi from "./Utility/AuthApi"

function App() {
  const [auth, setAuth ] = useState({session: false, userInfo:{}});
  return (
    <div className="App">
      <AuthApi.Provider value={{ auth, setAuth }}>
      <NaviBar />
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/" component={Home} />
        <Route path="/listing/new">
          <ListingNew />
        </Route>
        <Route exact path="/about" component={About}></Route>
        <Route path="/listing/:id">
          <Listing />
        </Route>
        <Route path="/order/:id">
          <Order />
        </Route>
      </Switch>
      </AuthApi.Provider>
    </div>
  );
}
export default App;

// <>
// <div className="App">
//     <Switch>
//     <NaviBar/>
//     <Route path='/listing/new'>
//         <ListingNew />
//       </Route>
//       <Route path='/listing/Login'>
//       <Login/>
//       </Route>
//       <Route path='/listing/about'>
//       <About />
//     </Route>
//   </Switch>
// </div>
// </>
