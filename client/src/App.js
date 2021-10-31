import './App.css';
import {Route, Switch} from 'react-router'
import ListingNew from './Components/ListingNew';
import ButtonAppBar from './Components/Navbar';
import Listing from './Components/Listing';
import Order from './Components/Order';

function App() {
  return (
    <>
    <ButtonAppBar />
    <div className="App">
      <Switch>
        <Route path='/listing/new'>
          <ListingNew />
        </Route>
        <Route path='/listing/:id'>
          <Listing />
        </Route>
        <Route path='/order/:id'>
          <Order />
        </Route>
      </Switch>
    </div>
    </>
  );
}

export default App;
