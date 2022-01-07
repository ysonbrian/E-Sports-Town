import React from 'react'
import "./CardTemplate.css"

const CardTemplate = () => (
    <div>
        <div className='cardContainer'>
            <div className='cardImage'>
                <img src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg" />
            </div>
            <div className='cardContents'>
                <div className='creator'>
                    Elliot Baker
                </div>
                <div className='description'>
                    Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.
                    Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.
                    Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.
                </div>
            </div>
            <div className='cardMore'>
                <div className='price'>
                    <i class="fab fa-btc"></i>
                    {5}
                </div>
                <div className='date'>
                    <i class="far fa-calendar-alt"></i>
                    2022y01m01d
                </div>
            </div>
        </div>
    </div>
)

export default CardTemplate