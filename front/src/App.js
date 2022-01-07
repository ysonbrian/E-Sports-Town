import './App.css';
import Header from './MenuBar/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProNFT from './components/ProNFT';
import NomalNFT from './components/NomalNFT';
import Auction from './components/Auction';
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
            <Home/>
          </Route>

          <Route path="/pronp">
            <Header/>
            <ProNFT />
            </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/pronft">
            <ProNFT />
          </Route>
          <Route path="/nomalnft">
            <NomalNFT />
          </Route>
          <Route path="/auction">
            <Auction />
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