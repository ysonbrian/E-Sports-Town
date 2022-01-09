import React from 'react';
import './ProNFT.css';
import { dummydata } from '../utils/dummyData';
import CardTemplate from '../components/CardTemplate';

function ProNFT() {
    return (
        <div className="page">
            <h1 className='pageTitle'>
                ProNFT-Market
            </h1>
            <div className='listContainer'>
                {dummydata && dummydata.nft.slice(0).reverse().map((el) => {
                    return (
                        <div className='listItem'>
                            <CardTemplate
                                id={el.id}
                                imgURI={el.imgURI}
                                user={el.user}
                                description={el.description}
                                price={el.price}
                                created_at={el.created_at}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ProNFT;