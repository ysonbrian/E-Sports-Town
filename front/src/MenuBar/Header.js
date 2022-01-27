import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { useStore, useWeb3 } from '../utils/store';
import { login, logout } from '../utils/auth';
import styled from 'styled-components';
import { FiLogIn } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import logo from '../logo.png';

import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import Fortmatic from 'fortmatic';
import Portis from '@portis/web3';

const providerOptions = {
  /* See Provider Options Section */
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: 'pk_test_B339BA8200249E26', // required, test
    },
  },
  portis: {
    package: Portis, // required
    options: {
      id: '0a7de06b-b597-48af-9e68-66547acbcea1', // required
    },
  },
  binancechainwallet: {
    package: true,
  },
};

const web3Modal = new Web3Modal({
  //network: "mainnet", // optional
  //cacheProvider: false, // optional
  providerOptions, // required
});

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: 'Be Vietnam Pro', sans-serif;
  background-color: black;
`;

const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  margin-left: 20px;
  gap: 10px;

  img {
    width: 180px;
    height: 80px;
  }
`;

const HeaderBar = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 10px;
  font-size: 20px;
  a {
    text-decoration: none;
    color: white;
    cursor: pointer;
  }
  a:hover {
    color: red;
  }
`;

const HeaderIsLogin = styled.div`
  display: flex;
  margin-right: 5px;
  align-items: center;
`;

const CurrentAccount = styled.div`
  color: white;
`;

const HeaderMypage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

function Header() {
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  let navigate = useNavigate();

  const connectWallet = async () => {
    const web3ModalProvider = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(web3ModalProvider);
    const signer = await provider.getSigner(0);
    const address = await signer.getAddress();

    const accounts = [];
    console.log('accounts!!!!@!@!#!#', address);
    accounts.push(address);

    setUser(accounts);

    console.log('accounts!!!!!:' + accounts);
    const account = await login(accounts);
    setUser(account);
    window.location.assign('http://localhost:3000/');
  };

  async function disconnectWallet() {
    await web3Modal.clearCachedProvider();
    logout();
    setUser({});
  }

  const newUserAddress =
    user?.userAddress?.slice(0, 6) + '...' + user?.userAddress?.slice(-5);

  return (
    <HeaderContainer>
      <Logo>
        <Link to="/">
          <img src={logo} />
        </Link>
      </Logo>
      <HeaderBar>
        <Link to="/gallery">Gallery</Link>
        <Link to="/minting">NFT-Minting</Link>
        <HeaderIsLogin>
          {user?.userAddress ? (
            <>
              <Link to="/" className="Logout" onClick={disconnectWallet}>
                <FiLogOut size="30" />
              </Link>

              <Link to="/mypage">
                <HeaderMypage>
                  <CgProfile size="25" />
                  <CurrentAccount>{newUserAddress}</CurrentAccount>
                </HeaderMypage>
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="header_login" onClick={connectWallet}>
                <FiLogIn size="30" />
              </Link>
            </>
          )}
        </HeaderIsLogin>
      </HeaderBar>
    </HeaderContainer>
  );
}

export default Header;
