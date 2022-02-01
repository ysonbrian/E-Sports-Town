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
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s,
    background-color 0.25s ease-in;
  :hover {
    color: black;
    background-color: rgba(255, 255, 255, 0.7);
    transition: background-color 0.25s ease-in, 0.3s linear, color 0.3s ease-in;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgb(102, 100, 100);
    overflow: hidden;
    transform: translateY(-6px);
    button {
      color: black;
    }
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
  justify-content: center;
  align-items: center;
`;

const Price = styled.div`
  display: flex;
  flex: 1 0 0;
  gap: 5px;
`;

const Date = styled.div`
  display: flex;
  flex: 1 0 0;
  gap: 5px;
  margin-left: 30px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
  padding: 0 10px;
  gap: 10px;
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 30px;
  border-radius: 8px;
  text-align: center;
  color: #f4f4f4;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: light;
  font-size: 12px;
  cursor: pointer;
  padding: 0px;
  letter-spacing: 2px;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  :hover {
    background-color: #f4f4f4;
    cursor: pointer;
  }
`;

function CardVote({
  id,
  tokenId,
  imgURI,
  tokenURI,
  user,
  name,
  description,
  price,
  created_at,
  multiAuctionAddressList,
}) {
  let navigate = useNavigate();
  const selId = useStore((state) => state.id);
  const setId = useStore((state) => state.setId);
  const { setClickedItem } = useClickedItem();
  const newUserAddress = user.slice(0, 6) + '...' + user.slice(-5);
  const goToVote = (id) => {
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
      multiAuctionAddressList: multiAuctionAddressList,
    };
    console.log('AFDSFAFS', data);
    setId(tokenId);
    setClickedItem(data);
    navigate(`/polling/${tokenId}`);
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
    rDate = result1;
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
        <ButtonContainer>
          <SubmitButton
            onClick={() => {
              goToVote(id);
            }}
          >
            Vote Now
          </SubmitButton>
        </ButtonContainer>
      </CardContainer>
    </>
  );
}

export default CardVote;
