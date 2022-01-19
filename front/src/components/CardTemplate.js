import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, useClickedItem } from '../utils/store';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: solid 3px #5800FF;
  border-radius: 1rem;
  width: 300px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #5800FF;
  color: white;
  &:hover {
    background-color: #e0ffff;
    color: black;
    border: #e0ffff;
    transform: scale(1.1);
    cursor: pointer;
`;

const CardImage = styled.div`
  border: solid 1px #041562;
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
`;

const CardContents = styled.div`
  height: 100px;
  width: 260px;
  overflow: auto;
  margin: 5px;
`;

const Creator = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 2px;
  font-weight: bolder;
`;

const Description = styled.div`
  width: 260px;
  display: -webkit-box;
  margin: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const CardMore = styled.div`
  width: 260px;
  flex: 1 0 0;
  margin-bottom: 2px;
  display: flex;
  flex-direction: row;
`;

const Price = styled.div`
  flex: 1 0 0;
`;

const Date = styled.div`
  flex: 1 0 0;
`;

function CardTemplate({
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
  const { setClickedItem } = useClickedItem();
  const newUserAddress = user.slice(0, 6) + '...' + user.slice(-5);
  const goToAuction = (id) => {
    const data = {
      id: id,
      imgURI: imgURI,
      tokenURI: tokenURI,
      user: newUserAddress,
      name: name,
      description: description,
      price: price,
      created_at: rDate,
    };
    console.log('selId : ' + selId);
    console.log('CT id : ' + id);
    setId(id);
    console.log('selId : ' + selId);
    setClickedItem(data);
    navigate('/auction');
    // zustand id 저장, auction page에서 id에 대한 입찰 페이지
  };

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

    // rDate = new Date(
    //   Date.UTC(
    //     result[0],
    //     result[1] - 1,
    //     result[2],
    //     result[3],
    //     result[4],
    //     result[5]
    //   )
    // ).toLocaleString();
  }

  return (
    <>
      <CardContainer
        onClick={() => {
          goToAuction(id);
        }}
      >
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

export default CardTemplate;
