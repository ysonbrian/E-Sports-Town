import React, { useState, useEffect } from 'react';
import './Header.css'
import { Link } from "react-router-dom";
import Web3 from 'web3';

function Header() {
    const [web3, setWeb3] = useState();
    const [account, setAccount] = useState('');

    useEffect(() => {
        if (typeof (window.ethereum) !== "undefined") {
            try {
                const web = new Web3(window.ethereum);
                setWeb3(web);
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

    const connectWallet = async () => {
        var accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        setAccount(accounts[0]);
    }

    return (
        <div className="header">
            <Link to='/'>
                <img className="header_logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMA5HMTU1qw2nqKPOJvYGVku-Y2LeSOfNLfA&usqp=CAU" />
            </Link>
            <div className="header_nav">
                <Link to='/Pro'>
                    <div className="header_option">
                        ProNFT-Market
                    </div>
                </Link>
                <Link to='/NormalNFT'>
                    <div className="header_option">
                        NormalNFT-Market
                    </div>
                </Link>
                <Link to='/Auction'>
                    <div className="header_option">
                        ShowMeTheNFT
                    </div>
                </Link>
                <Link to='/Minting'>
                    <div className="header_option">
                        NFT-Minting
                    </div>
                </Link>
                <div className="header_option">
                    <div className="header_login" onClick={() => {
                        connectWallet();
                    }}>Login</div>

                    <div className="Logout">Logout</div>

                    <Link to='/MyPage'>
                        <div className="header_Mypage">MyPage</div>
                    </Link>

                    <div className="header_PublicKey">PublicKey : {account}</div>
                </div>
            </div>
        </div>
    );
}

export default Header;