import React from 'react';
import './NormalNFT.css';
import { dummydata } from '../utils/dummyData';
import CardTemplate from '../components/CardTemplate';

function NormalNFT() {
    return (
        <div className="page">
            <h1 className='pageTitle'>
                NormalNFT-Market
            </h1>
            <div className='listContainer'>
                {console.log(dummydata.nft)}
                {dummydata && dummydata.nft.slice(0).reverse().map((el) => {
                    console.log(el.imgURI);
                    console.log(el.user);
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

export default NormalNFT;