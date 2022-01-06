import React from 'react';
import './Header.css'

function Header() {
    return (
        <div className="header">
            <img className="header_logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMA5HMTU1qw2nqKPOJvYGVku-Y2LeSOfNLfA&usqp=CAU" />
            
            <div className="header_nav">

                <div className="header_option">
                    작가NFT
                </div>

                <div className="header_option">
                    일반NFT거래소
                </div>

                <div className="header_option">
                    Show Me The NFT
                </div>

                <div className="header_option">
                    NFT Minting
                </div>

                <div className="header_option">
                    <div className="header_login">Login/Logout</div>
                    <div className="header_Mypage">MyPage/PublicKey</div>
                    </div>
            </div>
        </div>
    );
}

export default Header;