import React from 'react';
import './Mypage.css';
import { dummydata } from '../utils/dummyData';
import CardTemplate from '../components/CardTemplate';

function Mypage() {
    return (
        <div className="page">
            <div className='profile_container'>
                <h1 className='pageTitle'>
                    Mypage
                </h1>
                <div className='profile'>
                    <i className="far fa-user"></i>
                    <div className='username'>
                        {dummydata.nft[0].user}
                    </div>
                    <div className='pk'>
                        PublicKey
                    </div>
                    <div className='cltnumber'>
                        Collection#
                    </div>
                </div>
                <h3 className='pageTitle'>
                    NFT List
                </h3>
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
        </div>
    );
}

export default Mypage;