import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, useClickedItem } from '../utils/store';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: solid 1px gray;
  border-radius: 1rem;
  padding-bottom: 1rem;
  width: 300px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  :hover {
    background-color: rgba(255, 255, 255, 0.7);
    color: black;
    border: #e0ffff;
    transform: scale(1);
    transition-duration: 0.1s;
    cursor: pointer;
  }
`;

const CardImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 270px;
  height: 270px;
  margin: 1rem;

  img {
    width: 270px;
    height: 270px;
  }
`

const CardContents = styled.div`
  height: 100px;
  width: 260px;
  overflow: auto;
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

function CardMyPage({
  id,
  imgURI,
  tokenURI,
  user,
  name,
  description,
  price,
  created_at,
}) {
  let navigate = useNavigate();
  const selId = useStore((state) => state.id);
  const setId = useStore((state) => state.setId);
  const newUserAddress = user.slice(0, 6) + '...' + user.slice(-5);

  console.log(created_at);
  const date = created_at.split('T');
  console.log(date);
  let rDate = null;
  if (date) {
    const newDate = date[0]?.split('-');
    const newtime = date[1]?.split('.');
    const newtime2 = newtime[0]?.split(':');
    const result = [...newDate, ...newtime2];
    const result1 = result.slice(0, 3).join('-');
    rDate = result1 + ' ' + newtime2.join(':');
  }

  return (
    <>
      <CardContainer>
        <CardImage>
          <img alt="" src={imgURI} />
        </CardImage>
        <CardContents>
          <Creator>{newUserAddress}</Creator>
          <Description>{description}</Description>
        </CardContents>
        <CardMore>
          <Price>
            <i className="fab fa-btc"></i>
            {price}
          </Price>
          <Date>
            <i className="far fa-calendar-alt"></i>
            {rDate}
          </Date>
        </CardMore>
      </CardContainer>
    </>
  );
}

export default CardMyPage;
