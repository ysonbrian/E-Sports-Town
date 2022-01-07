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
<<<<<<< HEAD
<<<<<<< HEAD
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/artist">
            <Artist />
=======
=======
>>>>>>> 31722255186fdf38c21be6a61faa0ac10af9f3dc

          <Route exact path="/">
            <Home/>
          </Route>

          <Route path="/pronp">
            <Header/>
<<<<<<< HEAD
            <Artist/>
>>>>>>> f0b39e4d39042eb1acee63c00ea22470ed43244f
=======
            <ProNFT />
            </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/pronft">
            <ProNFT />
>>>>>>> 31722255186fdf38c21be6a61faa0ac10af9f3dc
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