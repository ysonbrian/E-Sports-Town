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
import styled from 'styled-components';

<<<<<<< HEAD
const AppMainContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 1fr;
  background-color: #black;
`;

const AppMainMiddle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

=======
const RouterPages = styled.div`
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  text-align: center;
  vertical-align: middle;
`
>>>>>>> b2396f0560c5751d5e7d9d38baafc0c7e4229d17

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
    <div className="App">
      <HistoryRouter history={history}>
        <AppMainContainer />
        <Header />
        <RouterPages>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/pro" element={<ProNFT />} />
            <Route path="/normal" element={<NormalNFT />} />
            <Route path="/showme" element={<ShowMeTheNFT />} />
            <Route path="/minting" element={<Minting />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/auction" element={<Auction />} />
          </Routes>
        </RouterPages>
      </HistoryRouter>
    </div>
  );
}

export default App;
