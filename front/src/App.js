import './App.css';
import Header from './MenuBar/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Artist from './components/Artist';
import Nomal from './components/Nomal';
import Showme from './components/Showme';
import LogIn from './components/LogIn';
import Mypage from './components/Mypage';
import Minting from './components/Minting';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/artist">
            <Artist />
          </Route>
          <Route path="/nomal">
            <Nomal />
          </Route>
          <Route path="/showme">
            <Showme />
          </Route>
          <Route path="/minting">
            <Minting />
          </Route>
          <Route path="/mypage">
            <Mypage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;