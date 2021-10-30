import './App.css';
import {Route, Switch} from 'react-router'
import ListingNew from './Components/ListingNew';
import ButtonAppBar from './Components/Navbar';

function App() {
  return (
    <>
    <ButtonAppBar />
    <div className="App">
      <Switch>
        <Route path='/listing/new'>
          <ListingNew />
        </Route>
      </Switch>
    </div>
    </>
  );
}

export default App;
