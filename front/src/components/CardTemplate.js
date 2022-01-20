import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, useClickedItem } from '../utils/store';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: solid 3px #5800ff;
  border-radius: 1rem;
  width: 300px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #5800ff;
  color: white;
  :hover {
    background-color: #e0ffff;
    color: black;
    border: #e0ffff;
    transform: scale(1.1);
    cursor: pointer;
  }
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

const ButtonContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 40px;
  border-radius: 8px;
  text-align: center;
  color: #f4f4f4;
  border: none;
  background-color: #5800ff;
  font-weight: bold;
  cursor: pointer;
  padding: 0px 1.25rem;
  margin-right: 10px;
  letter-spacing: 2px;
  :hover {
    background-color: #e900ff;
  }
`;

function CardTemplate({
  id,
  tokenId,
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
      tokenId: tokenId,
      imgURI: imgURI,
      tokenURI: tokenURI,
      user: user,
      name: name,
      description: description,
      price: price,
      created_at: rDate,
    };
    setId(tokenId);
    setClickedItem(data);
    navigate(`/auction/${tokenId}`);
    // zustand id 저장, auction page에서 id에 대한 입찰 페이지
  };

  const goToMultiAuction = (id) => {
    const data = {
      id: id,
      tokenId: tokenId,
      imgURI: imgURI,
      tokenURI: tokenURI,
      user: user,
      name: name,
      description: description,
      price: price,
      created_at: rDate,
    };
    console.log('selId : ' + selId);
    console.log('CT id : ' + id);
    setId(tokenId);
    setClickedItem(data);
    navigate(`/multiauction/${tokenId}`);
    // zustand id 저장, auction page에서 id에 대한 입찰 페이지
  };

  const date = created_at.split('T');
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
      <CardContainer
      //onClick={() => {
      //  goToAuction(id);
      //}}
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
        <ButtonContainer>
          <SubmitButton
            onClick={() => {
              goToAuction(id);
            }}
          >Auction</SubmitButton>
          <SubmitButton
            onClick={() => {
              goToMultiAuction(id);
            }}
          >Multi
          Auction</SubmitButton>
        </ButtonContainer>
      </CardContainer>
    </>
  );
}

export default CardTemplate;
