import React from "react";
import styled from "styled-components";
import icon1 from "../../icon1.png";
import icon2 from "../../icon2.png";
import icon3 from "../../icon3.png";
import cardback from "../../cardback.png";

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
`;

function Signature() {
  return (
    <>
      <BackSignature>
        <SignatureTitle>Signature</SignatureTitle>
        <CardContainer>
          <Card>
            <img src={icon1} />
            <ContentTitle>E-Sport에 진심입니다.</ContentTitle>
            <Text>
              매주마다 투표시스템을 통해 최고의 인기 작품 3개를 선정하여
              메인페이지에 노출되도록 합니다.
            </Text>
          </Card>
          <Card>
            <img src={icon2} />
            <ContentTitle>유일한 것을 좋아합니다.</ContentTitle>{" "}
            <Text>
              E-Sport의 거대한 산업규모에서 나만의 콜렉션은 수집하는 걸 즐기는
              게이머들에게 매력적으로 다가갈 것 입니다.
            </Text>
          </Card>

          <Card>
            <img src={icon3} />{" "}
            <ContentTitle>"찰나"에 집착합니다.</ContentTitle>{" "}
            <Text>
              명장면을 통해 오프라인 스포츠 경기와 같은 짜릿함을 선사합니다.
              <p>
                이러한 짜릿함은 나만의 것으로 남기고 싶은 소유욕으로 나타날 것
                입니다.
              </p>
            </Text>
          </Card>
        </CardContainer>
      </BackSignature>
    </>
  );
}

export default Signature;
