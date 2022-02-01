import React from 'react';
import styled from 'styled-components';
import icon1 from '../../images/Signature-icon1.png';
import icon2 from '../../images/Signature-icon2.png';
import icon3 from '../../images/Signature-icon3.png';
import cardback from '../../images/cardback.png';

const BackSignature = styled.div`
  background-image: url(${cardback});
  background-size: 95% 95%;
  background-repeat: no-repeat;
  justify-content: space-between;
`;

const SignatureTitle = styled.h1`
  margin: 3rem 0;
  color: white;
  display: flex;
  justify-content: center;
  font-size: 5rem;
  color: red;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  margin-top: 300px;
`;

const Card = styled.div`
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.9);
  height: 400px;
  width: 270px;
  margin: 40px;
  margin-bottom: 500px;
  color: black;
  img {
    height: 170px;
    width: 170px;
    margin-bottom: 15px;
    margin-left: 50px;
    margin-top: 20px;
  }
`;

const ContentTitle = styled.h2`
  padding: 10px;
  color: white;
  text-align: center;
  background-color: red;
`;

const Text = styled.p`
  padding: 10px;
  font-size: 0.75rem;
`;

function Signature() {
  return (
    <>
      <BackSignature>
        <SignatureTitle>Signature</SignatureTitle>
        <CardContainer>
          <Card>
            <img src={icon1} />
            <ContentTitle>NFT 경매</ContentTitle>
            <Text>
              유저들의 경매참여를 통해 NFT의 가격이 결정됩니다.
              <br></br>
              <br></br>
              경매에 참여하여 원하는 금액에 NFT를 구매하세요!
              <br></br>
              페이커, 임요한 등 세계적인 선수들의 빛나는 순간을 영원한 나의
              것으로 소유할 수 있습니다.
            </Text>
          </Card>
          <Card>
            <img src={icon2} />
            <ContentTitle>NFT 공동소유</ContentTitle>{' '}
            <Text>
              DAO 형태로 다수의 유저들이 NFT를 공동 소유 및 판매할 수 있습니다.
              <br></br>
              <br></br>
              공동구매(Multi-Auction)을 통해 모두가 NFT를 소유하는 세계를
              지향합니다.
            </Text>
          </Card>

          <Card>
            <img src={icon3} />{' '}
            <ContentTitle>자유로운 커뮤니케이션</ContentTitle>{' '}
            <Text>
              NFT 거래시,
              <br></br>
              의사결정을 나눌 수 있는 채팅(커뮤티케이션) 공간을 DAO형태로
              제공함으로 유저들 간 불필요한 에너지 소비를 예방하며 건강한 사용자
              경험을 제공합니다.
              <br></br>
              <br></br>
              구매/판매자 간의 직접적인 소통을 통해 원활한 거래가 이뤄집니다.
            </Text>
          </Card>
        </CardContainer>
      </BackSignature>
    </>
  );
}

export default Signature;
