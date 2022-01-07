import React from 'react';
import './NormalNFT.css';
import CardTemplate from '../components/CardTemplate';

function NormalNFT() {
    return (
        <div className="page">
            <h1 className='pageTitle'>
                NormalNFT-Market
            </h1>

            <div className='list'>
                <CardTemplate />
            </div>
        </div>
    );
}

export default NormalNFT;