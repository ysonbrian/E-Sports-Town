import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../utils/store';
import styled from 'styled-components';

const CardContainer = styled.div`
    border: solid 3px gray;
    border-radius: 1rem;
    width: 300px;
    height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CardImage = styled.div`
    border: solid 1px gray;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 280px;
    height: 280px;
    margin: 1rem;

    img {
        width: 270px;
        height: 270px;
    }
`

const CardContents = styled.div`
    height: 100px;
    width: 260px;
    margin: 5px;
`

const Creator = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 2px;
    font-weight: bolder;
`

const Description = styled.div`
    width: 260px;
    display: -webkit-box;
    margin: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`

const CardMore = styled.div`
    width: 260px;
    flex: 1 0 0;
    margin-bottom: 2px;
    display: flex;
    flex-direction: row;
`

const Price = styled.div`
    flex: 1 0 0;
`

const Date = styled.div`
    flex: 1 0 0;
`


function CardTemplate({ id, imgURI, user, description, price, created_at }) {

    let navigate = useNavigate();
    const selId = useStore((state) => state.id);
    const setId = useStore((state) => state.setId);


    const goToAuction = (id) => {
        console.log("selId : " + selId)
        console.log("CT id : " + id)
        setId(id)
        console.log("selId : " + selId)
        navigate('/auction');
        // zustand id 저장, auction page에서 id에 대한 입찰 페이지
    }

    return (
        <>
            <CardContainer onClick={() => {
                goToAuction(id);
            }}>
                <CardImage>
                    <img src={imgURI} />
                </CardImage>
                <CardContents>
                    <Creator>
                        {user}
                    </Creator>
                    <Description>
                        {description}
                    </Description>
                </CardContents>
                <CardMore>
                    <Price>
                        <i className="fab fa-btc"></i>
                        {price}
                    </Price>
                    <Date>
                        <i className="far fa-calendar-alt"></i>
                        {created_at}
                    </Date>
                </CardMore>
            </CardContainer>
        </>
    )
}

export default CardTemplate;
