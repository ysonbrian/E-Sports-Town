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
import Minting from './pages/Minting';
import Mypage from './pages/Mypage';
import Modal from 'react-modal';
import {
  useStore,
  useMypage,
  useMyToken,
  useSign,
  useClickedItemBidList,
} from './utils/store';
import { getCurrentUser, login, logout, parseJwt } from './utils/auth';
import Auction from './pages/Auction';
import styled from 'styled-components';
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

function App() {
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  const [sign, setSign] = useSign((state) => [state.sign, state.setSign]);
  const myPage = useMypage((state) => state.mypage);
  const clickedItemList = useClickedItemBidList(
    (state) => state.clickedItemList
  );
  const { fetchClickedItem } = useClickedItemBidList();
  // const { fetchMyPage } = useMypage();
  const { fetchMyToken } = useMyToken();
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

  const handlePersonalSign = async () => {
    const message = [
      '현재 보고 있는 사이트에서 로그인 권한을 위해 당신의 서명이 필요합니다.',
      '지금 사이트의 규칙을 준수함을 약속하며 서명하기 원합니다.',
      '로그인 부탁드립니다!',
    ].join('\n\n');
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = accounts[0];
    const sign = await window.ethereum.request({
      method: 'personal_sign',
      params: [message, account],
    });
    setSign(sign);
    return sign;
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log(window.ethereum);
      window.ethereum.on('accountsChanged', async (accounts) => {
        console.log('Account changed: ', accounts);
        await logout();
        setUser({});
        const ob = await handlePersonalSign();
        const data = await login(accounts);
        setUser(data);
        window.location.assign('http://localhost:3000/');
        console.log('Sign', sign);
        console.log('Ob', ob);
        window.location.reload(false);
      });
      window.ethereum.on('chainChanged', (chainId) => {
        console.log('Chain ID changed: ', chainId);
      });
    } else {
      console.log('Please Install MetaMask');
    }
  }, []);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
      fetchMyToken(user);
      fetchClickedItem();

      console.log('User logged in!', user);
    }
  }, [setUser, fetchClickedItem]);

  return (
    <HistoryRouter history={history}>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/minting" element={<Minting />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route
          path="/auction/:id"
          element={<Auction clickedItemList={clickedItemList} />}
        />
      </Routes>
    </HistoryRouter>
  );
}
Modal.setAppElement('#root');

export default App;
