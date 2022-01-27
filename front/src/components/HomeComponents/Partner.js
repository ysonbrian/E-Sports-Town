import React from "react";
import nexon from "../../nexon.jpeg";
import kakao from "../../kakao.png";
import hangame from "../../hangame.jpeg";
import codestates from "../../codestates.png";
import ncsoft from "../../ncsoft.png";
import battle from "../../battle.png";
import styled from "styled-components";

const PartnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 50px;
`;
const PartnerTitle = styled.h1`
  margin: 2rem 0;
  color: white;
  display: flex;
  justify-content: center;
  font-size: 5rem;
  color: red;
`;
const PartnerImg = styled.div`
  display: flex;
  width: 500px;
  margin: 50px;
  overflow-x: scroll;
  img {
    width: 300px;
    height: 200px;
  }
`;
const PartnerInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: white;
  font-size: 22px;
  line-height: 2em;
`;

const Partnerpicture = styled.div`
  img {
    width: 100%;
  }
`;

const GroupOne = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

function Partner() {
  return (
    <>
      <PartnerTitle>PARTNERSHIPS</PartnerTitle>
      <PartnerContainer>
        <GroupOne>
          <PartnerImg>
            <img src={nexon} />
            <img src={codestates} />
            <img src={ncsoft} />
            <img src={kakao} />
            <img src={hangame} />
          </PartnerImg>
          <PartnerInfo>
            <div>
              'E-SPORTS TOWN' 블록체인 선두기업들과 협력하고 있습니다.
            </div>
            <div>
              함께 건강한 블록체인 생태계를 만들어갈 분들은 언제나 환영입니다.
            </div>
          </PartnerInfo>
        </GroupOne>
        <Partnerpicture>
          <img src={battle} />
        </Partnerpicture>
      </PartnerContainer>
    </>
  );
}

export default Partner;
