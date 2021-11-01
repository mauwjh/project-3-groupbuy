
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
      <Switch>
        <Route exact path="/listing/Login" component={Login}></Route>
        <div>
          <NaviBar />
          <Route exact path="/" component={Home} />
          <Route path="/listing/new">
            <ListingNew />
          </Route>
          <Route exact path="/listing/about" component={About}></Route>
        <Route path='/listing/:id'>
          <Listing />
        </Route>
        <Route path='/order/:id'>
          <Order />
        </Route>
        </div>
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
