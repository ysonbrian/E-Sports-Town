import React from 'react';
import './Auction.css';
import { useStore } from '../utils/store';
import CardTemplate from '../components/CardTemplate';
import { dummydata } from '../utils/dummyData';

function Auction() {

    const id = useStore((state) => state.id)
    console.log("auction-id : " + id);
    const data = dummydata.nft[id-1];
    console.log(data);

    return (
        <div className='page'>
            <h1 className='pageTitle'>
                Auction
            </h1>
            <div className='auctionNFT'>
                <div className='imgNFT'>
                    <div className='listItem'>
                        {data !== undefined ?
                        <CardTemplate
                            id={data.id}
                            imgURI={data.imgURI}
                            user={data.user}
                            description={data.description}
                            price={data.price}
                            created_at={data.created_at}
                        /> : <div></div>}
                    </div>
                </div>
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