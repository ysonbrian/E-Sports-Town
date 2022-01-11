import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { useStore } from '../utils/store';
import { login, logout } from '../utils/auth';
import styled from 'styled-components';

const HeaderContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
font-family: 'Be Vietnam Pro', sans-serif;
background-color: #FEECE9;
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
    width: 200px;
    height: 100px;
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
  color: black;
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

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web = new Web3(window.ethereum);
        console.log(web);
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
    const account = await login(accounts);
    setUser(account.data);
    console.log(user);
    navigate('/');
    window.location.reload(false);
  };

  return (
    <HeaderContainer>
      <Logo>
      <Link to="/">
        <img
          alt=""
          src="https://drive.google.com/uc?export=view&id=1-ZWmfkTmpNTO8kglTINlT7M-k_KDQ8ai"
        />
      </Link>
      </Logo>

<HeaderBar>
      <Link to="/pro">
        ProNFT-Market
      </Link>
      <Link to="/normal">
        NormalNFT-Market
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
            <Link to="/mypage">
              <div className="header_Mypage">MyPage</div>
            </Link>
          </>
        )}
      </HeaderIsLogin>
      </HeaderBar>
    </HeaderContainer>
  );
}

export default Header;