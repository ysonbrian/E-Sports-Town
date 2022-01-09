import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { useStore } from '../utils/store';
import { login, logout } from '../utils/auth';

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
    <div className="header">
      <Link to="/">
        <img
          alt=""
          className="header_logo"
          src="https://drive.google.com/uc?export=view&id=1cIHsqCjp-bxD-YGMKXgcxap8YiI1v2sg"
        />
      </Link>
      <div className="header_nav">
        <Link to="/pro">
          <div className="header_option">ProNFT-Market</div>
        </Link>
        <Link to="/normal">
          <div className="header_option">NormalNFT-Market</div>
        </Link>
        <Link to="/showme">
          <div className="header_option">ShowMeTheNFT</div>
        </Link>
        <Link to="/minting">
          <div className="header_option">NFT-Minting</div>
        </Link>
        <div className="header_option">
          {user?.userAddress ? (
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
          ) : (
            <>
              <Link to="/" className="header_login" onClick={connectWallet}>
                Login
              </Link>
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
            </>
          )}
          <Link to="/mypage">
            <div className="header_Mypage">MyPage</div>
          </Link>
          <div className="header_PublicKey">
            PublicKey : {user?.userAddress}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
