import React from "react";
import styled from "styled-components";
import game1 from "../../game1.gif";
import mainImage from "../../MainImage.jpg";
import mottoback from "../../mottoback.jpeg";

const Mottos = styled.div`
  display: flex;
  height: 1000px;
  width: 100%;
  flex-direction: column;
  background-image: url(${mottoback});
  background-size: 100% 110%;
`;

const MottoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 200px;
`;

const MottoImg1 = styled.div`
  img {
    width: 1000px;
    height: 500px;
  }
`;

const MottoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const MottoTitle = styled.h1`
  font-size: 5em;
  line-height: 1em;
`;

const MottoText = styled.h4`
  font-style: normal;
  font-weight: 500;
  line-height: 3em;
  letter-spacing: 0;
  text-align: center;
  font-size: 18px;
`;

function Motto() {
  return (
    <Mottos>
      <MottoContainer>
        <MottoImg1>
          <img src={game1} />
        </MottoImg1>
      </MottoContainer>
      <MottoContent>
        <MottoTitle>Choose and Imagine</MottoTitle>
        <MottoText>
          <p>당신의 NFT 카드를 선택하세요. 놀라운 경험을 하게 될 것 입니다.</p>
        </MottoText>
      </MottoContent>{" "}
    </Mottos>
  );
}

export default Motto;
