import './App.css';
import {Route, Switch} from 'react-router'
import ListingNew from './Components/ListingNew';
import ButtonAppBar from './Components/Navbar';
import NaviBar from './Components/Navibar';
import About from './Components/About';

function App() {
  return (
    <>
      <ButtonAppBar />
      <NaviBar/>
    <div className="App">
      <Switch>
        <Route path='/listing/new'>
          <ListingNew />
          </Route>
          <Route path='/listing/about'>
          <About />
        </Route>
      </Switch>
    </div>
    </>
  );
}

export default App;
