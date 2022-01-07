import React from 'react'
import "./CardTemplate.css"
import { useNavigate } from 'react-router-dom';

function CardTemplate({id, imgURI, user, description, price, created_at}) {

    let navigate = useNavigate();

    const goToAuction = () => {
        navigate('/auction');
        // zustand id 저장, auction page에서 id에 대한 입찰 페이지
    }

    return (
        <div>
            <div className='cardContainer' onClick={() => {
                goToAuction(id);
            }}>
                <div className='cardImage'>
                    <img src={imgURI} />
                </div>
                <div className='cardContents'>
                    <div className='creator'>
                        {user}
                    </div>
                    <div className='description'>
                        {description}
                    </div>
                </div>
                <div className='cardMore'>
                    <div className='price'>
                        <i className="fab fa-btc"></i>
                        {price}
                    </div>
                    <div className='date'>
                        <i className="far fa-calendar-alt"></i>
                        {created_at}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardTemplate;
