import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Artist from './Artist';
import Nomal from './Nomal';
import Showme from './Showme';
import LogIn from './LogIn';
import Mypage from './Mypage';
import Minting from './Minting';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>

          <Route eaxct path="/">
            <Header/>
            <Home/>
          </Route>

          <Route path="/artist">
            <Header/>
            <Artist/>
          </Route>

          <Route path="/nomal">
            <Header/>
            <Nomal/>
          </Route>

          <Route path="/showme">
            <Header/>
            <Showme/>
          </Route>

          <Route path="/minting">
            <Minting/>
          </Route>

          <Route path="/login">
            <LogIn/>
          </Route>

          <Route path="/mypage">
            <Mypage/>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;