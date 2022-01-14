import { useEffect, useState } from 'react';
import './App.css';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from './MenuBar/Header';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ShowMeTheNFT from './pages/ShowMeTheNFT';
import Minting from './pages/Minting';
import Mypage from './pages/Mypage';

import { useStore, useMypage } from './utils/store';
import { getCurrentUser, logout, parseJwt } from './utils/auth';

import Auction from './pages/Auction';
import styled from 'styled-components';

const RouterPages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


const AppContainer = styled.div`
display: grid;
height: 100%;
grid-template-rows: 1fr;
background-color: #f4f4f4
`;

const AppMainMiddle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`;

function App() {
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  const myPage = useMypage((state) => state.mypage);
  const { fetchMyPage } = useMypage();
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
      fetchMyPage(user);
      console.log('User logged in!', user);
    }
  }, [setUser]);

  return (
    <HistoryRouter history={history}>
    <Header />
    <AppContainer>
    <AppMainMiddle>
        <RouterPages>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/showme" element={<ShowMeTheNFT />} />
            <Route path="/minting" element={<Minting />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/auction" element={<Auction />} />
          </Routes>
        </RouterPages>
    </AppMainMiddle>
    </AppContainer>
    </HistoryRouter>
  );
}

export default App;
