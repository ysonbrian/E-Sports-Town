import React from 'react'
import "./CardTemplate.css"

function CardTemplate({imgURI, user, description, price, created_at}) {

    console.log(imgURI.imgURI);
    console.log(JSON.stringify(user));

    return (
        <div>
            <div className='cardContainer'>
                <div className='cardImage'>
                    {/*<img src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg" />*/}
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

export default CardTemplate