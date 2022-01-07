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
<<<<<<< HEAD
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/artist">
            <Artist />
=======

          <Route exact path="/">
            <Header/>
            <Home/>
          </Route>

          <Route path="/pronp">
            <Header/>
            <Artist/>
>>>>>>> f0b39e4d39042eb1acee63c00ea22470ed43244f
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