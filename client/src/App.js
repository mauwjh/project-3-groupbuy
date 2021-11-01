import "./App.css";
import { Route, Redirect, Switch } from "react-router";
import ListingNew from "./Components/ListingNew";
import NaviBar from "./Components/Navibar";
import About from "./Components/About";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Listing from "./Components/Listing";
import Order from "./Components/Order";
import ListingEdit from "./Components/ListingEdit";
import User from "./Components/User";

function App() {
  return (
    <div className="App">
      <NaviBar />
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/" component={Home} />
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
