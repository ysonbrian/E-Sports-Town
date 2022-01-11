import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { useStore } from '../utils/store';
import { login, logout } from '../utils/auth';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  img {
    width: 100px;
    height: 100px;
    padding: 5px;
  }
`
const HeaderIsLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function Header() {
  const [web3, setWeb3] = useState();
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  let navigate = useNavigate();

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web = new Web3(window.ethereum);
        //console.log(web);
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const connectWallet = async () => {
    var accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    setUser(accounts);
    console.log("accounts:"+accounts);
    const account = await login(accounts);
    setUser("account.data:"+account.data);
    console.log("connectWallet:"+user);
    navigate('/');
    window.location.reload(false);
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <img
          alt=""
          src="https://drive.google.com/uc?export=view&id=1-ZWmfkTmpNTO8kglTINlT7M-k_KDQ8ai"
        />
      </Link>
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
              onClick={() => {
                logout();
                setUser({});
              }}
            >
              Logout
            </Link>
            <Link to="/mypage">
              <div className="header_Mypage">MyPage</div>
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className="header_login" onClick={connectWallet}>
              Login
            </Link>
          </>
        )}
      </HeaderIsLogin>
    </HeaderContainer>
  );
}

export default Header;