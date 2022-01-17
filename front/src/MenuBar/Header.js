import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { useStore } from '../utils/store';
import { login, logout } from '../utils/auth';
import styled from 'styled-components';
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Fortmatic from "fortmatic";
import Portis from "@portis/web3";
import Authereum from "authereum";
import MewConnect from '@myetherwallet/mewconnect-web-client';

const providerOptions = {
  /* See Provider Options Section */
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: "pk_test_B339BA8200249E26" // required, test
      //network: customNetworkOptions // if we don't pass it, it will default to localhost:8454
    }
  },
  portis: {
    package: Portis, // required
    options: {
      id: "0a7de06b-b597-48af-9e68-66547acbcea1" // required
    }
  },
  authereum: {
    package: Authereum // required
  },
  mewconnect: {
    package: MewConnect,
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID
    }
  },
  binancechainwallet: {
    package: true
  },
}

const web3Modal = new Web3Modal({
  //network: "mainnet", // optional
  //cacheProvider: false, // optional
  providerOptions // required
});

const HeaderContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
font-family: 'Be Vietnam Pro', sans-serif;
background-color: black;
`;

const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  gap: 10px;
  a {
    text-decoration: none;
    cursor: pointer;
    color: #00406e;
    font-size: 20px;
  }
  a:hover {
    color: black;
  }
  img {
    width: 120px;
    height: 120px;
  }
`;


const HeaderBar = styled.ul`
display: flex;
align-items: center;
justify-content: flex-end;
gap: 20px;
padding: 10px;
a {
  text-decoration: none;
  color: white;
  cursor: pointer;
}
a:hover {
  color: #FE7E6D;
}
input {
  width: 200px;
}
li {
  list-style: none;
  text-decoration: none;
  width: 100%;
}
`;


const HeaderIsLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function Header() {
  const [web3, setWeb3] = useState();
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  let navigate = useNavigate();

  //useEffect(() => {
  //  if (typeof window.ethereum !== 'undefined') {
  //    try {
  //      const web = new Web3(window.ethereum);
  //      //console.log(web);
  //      setWeb3(web);
  //    } catch (err) {
  //      console.log(err);
  //    }
  //  }
  //}, []);

  const connectWallet = async () => {
    //var accounts = await window.ethereum.request({
    //  method: 'eth_requestAccounts',
    //});
    //setUser(accounts);
    //console.log("accounts:" + accounts);
    //const account = await login(accounts);
    //setUser("account.data:" + account.data);
    //console.log("connectWallet:" + user);
    //navigate('/');
    //window.location.reload(false);


    //var accounts = await window.ethereum.request({
    //  method: 'eth_requestAccounts',
    //});
    //setUser(accounts);

    const web3ModalProvider = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(web3ModalProvider);
    const signer = await provider.getSigner(0);
    const address = await signer.getAddress();

    const accounts = [];
    accounts.push(address)

    setUser(accounts);

    console.log("accounts:" + accounts);
    const account = await login(accounts);
    setUser("account.data:" + account.data);
    //console.log("connectWallet:" + user);
    //navigate('/');
    navigate('/mypage');
    window.location.reload(false);
  };

  async function disconnectWallet() {
    await web3Modal.clearCachedProvider();
    logout();
    setUser({});
  }

  return (
    <HeaderContainer>
      <Logo>
        <Link to="/">
          <img
            alt=""
            src="https://drive.google.com/uc?export=view&id=1B6803webj_PhMXpTzM9UFkWVVD_OEKxo"
          />
        </Link>
      </Logo>
      <HeaderBar>
        <Link to="/gallery">
          Gallery
        </Link>
        <Link to="/showme">
          ShowMeTheNFT
        </Link>
        <Link to="/minting">
          NFT-Minting
        </Link>
        <HeaderIsLogin>
          {user?.userAddress ? (
            <>
              <Link
                to="/"
                className="Logout"
                onClick={disconnectWallet}
              //onClick={() => {
              //  logout();
              //  setUser({});
              //}}
              >
                <FiLogOut size="25" />
              </Link>
              <Link to="/mypage">
                <div className="header_Mypage"><CgProfile size="25" /></div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="header_login" onClick={connectWallet}>
                <FiLogIn size="25" />
              </Link>
            </>
          )}
        </HeaderIsLogin>
      </HeaderBar>
    </HeaderContainer>
  );
}

export default Header;