import "./App.css";
import { Route, Redirect, Switch } from "react-router";
import ListingNew from "./Components/ListingNew";
import NaviBar from "./Components/Navibar";
import About from "./Components/About";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Listing from "./Components/Listing";
import Order from "./Components/Order";
import SignUp from "./Components/SignUp";
import SignUpBuyer from "./Components/SignUpBuyer";
  
function App() {
  return (
    <div className="App">
      <NaviBar />
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signup/buyer" component={SignUpBuyer} />
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
    </div>
  );
}
export default App;


