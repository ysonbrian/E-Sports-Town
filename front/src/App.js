import { useEffect } from 'react';
import './App.css';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from './MenuBar/Header';
import Home from './pages/Home';
import ProNFT from './pages/ProNFT';
import NormalNFT from './pages/NormalNFT';
import ShowMeTheNFT from './pages/ShowMeTheNFT';
import Minting from './pages/Minting';
import Mypage from './pages/Mypage';

import { useStore } from './utils/store';
import { getCurrentUser, logout, parseJwt } from './utils/auth';
import Auction from './pages/Auction';

function App() {
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);

  let history = createBrowserHistory();
  history.listen((location, action) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logout();
        setUser({});
      }
    }
  });

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
      console.log('User logged in!', user);
    }
  }, [setUser]);

  return (
    <div className="app">
      <HistoryRouter history={history}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/pro" element={<ProNFT />} />
          <Route path="/normal" element={<NormalNFT />} />
          <Route path="/showme" element={<ShowMeTheNFT />} />
          <Route path="/minting" element={<Minting />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/auction" element={<Auction />} />
        </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;
