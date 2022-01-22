import React from "react";
import styled from "styled-components";
import test from "../test.gif";
import mainImage from "../MainImage.jpg";

const MottoContainer = styled.div`
  display: flex;
  padding: 200px 0;
  justify-content: center;
  background-image: url(${mainImage});
  background-size: cover;
  background-repeat: no-repeat;
`;
const MottoImg = styled.div`
  padding: 40px;
  img {
    width: 400px;
    height: 400px;
  }
`;

const MottoContent = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;
  justify-content: center;
  padding-left: 80px;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const MottoTitle = styled.h1`
  font-size: 57px;
  line-height: 57px;
  margin-bottom: 28px;
  margin-right: 28px;
`;

const MottoText = styled.h4`
  margin-bottom: 28px;
  margin-top: 0px;
  font-size: 21px;
  line-height: 2em;
  font-size: 24px;
  word-break: break-all;
`;

function Motto() {
  return (
    <MottoContainer>
      <MottoImg>
        <img src={test} />
      </MottoImg>

      <MottoContent>
        <MottoTitle>Choose and Imagine</MottoTitle>
        <MottoText>
          <div>U never know how amazing</div>
          <div>your NFT Card is in E-sport</div>
          <div>before you get to know what it is</div>
          <div>당신의 NFT 카드를 선택하세요.</div>
          <div>당신은 놀라운 경험을 하게 될 것 입니다.</div>
        </MottoText>
      </MottoContent>
    </MottoContainer>
  );
}

export default Motto;
