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

import { useStore, useGallery } from './utils/store';
import { getCurrentUser, logout, parseJwt } from './utils/auth';
import { getGalleryList } from './utils/data';
import Auction from './pages/Auction';
import styled from 'styled-components';

const RouterPages = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 1fr;
`;

function App() {
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  // const [gallery, setGallery] = useGallery((state) => [
  //   state.gallery,
  //   state.setGallery,
  // ]);
  const [getData, setGetData] = useState();
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

  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   const galleryData = await getGalleryList();
  //   //   console.log('galleryData', galleryData);
  //   //   setGetData(galleryData);
  //   //   console.log('after', getData);
  //   //   setGallery(getData);
  //   //   console.log(gallery);
  //   // };
  //   // fetchData();
  //   const galleryData = getGalleryList();
  //   if (galleryData) {
  //     setGallery(galleryData);
  //     console.log('hahahah', gallery);
  //   }
  // }, [setGallery, setGetData]);

  return (
    <div className="app">
      <HistoryRouter history={history}>
        <Header />
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
      </HistoryRouter>
    </div>
  );
}

export default App;
