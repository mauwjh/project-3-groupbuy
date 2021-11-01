
import "./App.css";
import { Route, Redirect, Switch } from "react-router";
import ListingNew from "./Components/ListingNew";
import NaviBar from "./Components/Navibar";
import About from "./Components/About";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Listing from './Components/Listing';
import Order from './Components/Order';

function App() {
  return (
    <div className="App">
      <NaviBar />
      <Switch>
      <Route exact path="/" > <Home/> </Route>
        <Route path="/login" ><Login/></Route>
        <Route path='/listing/:id'>
        <Listing />
        </Route>
        <Route path="/about" ><About/></Route>
        <Route path="/listing/new">
        <ListingNew />
          </Route>
        <Route path='/order/:id'>
          <Order />
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
