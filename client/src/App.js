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

function App() {
  return (
    <div className="App">
      <NaviBar />
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/" component={Home} />
        <Route exact path="/signUp" component={SignUp} />
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


