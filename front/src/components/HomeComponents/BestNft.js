import React from "react";
import styled from "styled-components";
import card1 from "../../card1.gif";
import card2 from "../../card2.gif";
import card3 from "../../card3.gif";

const Title = styled.div`
  font-size: 4rem;
  color: white;
  text-align: center;
  background-color: darkgray;
  padding-top: 100px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: darkgray;
  padding-bottom: 100px;
`;

const Card = styled.div`
  border-radius: 15px;
  background: white;
  height: 400px;
  width: 270px;
  margin: px;
  color: black;

  img {
    border-radius: 15px;
    height: 170px;
    width: 270px;
    margin-bottom: 15px;
  }
`;

const ContentTitle = styled.h2`
  padding: 10px;
`;

const Text = styled.p`
  padding: 10px;
`;

function BestNft(props) {
  return (
    <>
      <Title>E-Twon:U-Pick</Title>
      <CardContainer>
        <Card>
          <img src={card1} />
          <ContentTitle>E-Sport에 진심입니다.</ContentTitle>
          <Text>
            매주마다 투표시스템을 통해 최고의 인기 작품 3개를 선정하여
            메인페이지에 노출되도록 합니다.
          </Text>
        </Card>
        <Card>
          <img src={card2} />
          <ContentTitle>유일한 것을 좋아합니다.</ContentTitle>{" "}
          <Text>
            E-Sport의 거대한 산업규모에서 나만의 콜렉션은 수집하는 걸 즐기는
            게이머들에게 매력적으로 다가갈 것 입니다.
          </Text>
        </Card>

        <Card>
          <img src={card3} /> <ContentTitle>"찰나"에 집착합니다.</ContentTitle>{" "}
          <Text>
            명장면을 통해 오프라인 스포츠 경기와 같은 짜릿함을 선사합니다.
            이러한 짜릿함은 나만의 것으로 남기고픈 소유욕으로 나타날 것 입니다.
          </Text>
        </Card>
      </CardContainer>
    </>
  );
}

export default BestNft;
