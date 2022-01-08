import React from 'react';
import './Auction.css';

function Auction() {
    return (
        <div className='page'>
            <h1 className='pageTitle'>
                Auction
            </h1>
            <div className='auctionNFT'>
                <div className='imgNFT'>image</div>
                <div className='profileNFT'>
                    <div className='dateNFT'>created date</div>
                    <div className='final-bid-container'>Winning bid</div>
                    <div className='bid-list-container'>bid listing</div>
                </div>
            </div>
            <div className='otherNFT'>other nft infos</div>
        </div>
    );
}

export default Auction;