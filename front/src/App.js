import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './MenuBar/Header';
import Home from './pages/Home';
import ProNFT from './pages/ProNFT';
import NormalNFT from './pages/NormalNFT';
import Auction from './pages/Auction';
import Minting from './pages/Minting';
import Mypage from './pages/Mypage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Pro">
            <ProNFT />
          </Route>
          <Route path="/NormalNFT">
            <NormalNFT />
          </Route>
          <Route path="/Auction">
            <Auction />
          </Route>
          <Route path="/Minting">
            <Minting />
          </Route>
          <Route path="/Mypage">
            <Mypage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;