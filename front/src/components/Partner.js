import React from "react";
import nexon from "../nexon.jpeg";
import kakao from "../kakao.png";
import hangame from "../hangame.jpeg";
import codestates from "../codestates.png";
import ncsoft from "../ncsoft.png";
import styled from "styled-components";

const PartnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 100px;
  padding: 100px;
`;
const PartnerTitle = styled.h1`
  margin-top: 1rem;
  color: white;
  display: flex;
  justify-content: center;
  font-size: 40px;
  color: #5800ff;
`;
const PartnerImg = styled.div`
  display: flex;
  width: 400px;
  overflow-x: scroll;
  img {
    width: 150px;
    height: 150px;
  }
`;
const PartnerInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px 0;
  color: white;
  margin-top: 0px;
  font-size: 24px;
  word-break: break-all;
  line-height: 2em;
`;

function Partner() {
  return (
    <PartnerContainer>
      <PartnerTitle>PARTNERSHIPS</PartnerTitle>
      <PartnerImg>
        <img src={nexon} />
        <img src={codestates} />
        <img src={ncsoft} />
        <img src={kakao} />
        <img src={hangame} />
      </PartnerImg>
      <PartnerInfo>
        <div>'E-Town : U-Pick' 블록체인 선두기업들과 협력하고 있습니다.</div>
        <div>
          함께 건강한 블록체인 생태계를 만들어갈 분들은 언제나 환영입니다.
        </div>
      </PartnerInfo>
    </PartnerContainer>
  );
}

export default Partner;
