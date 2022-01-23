import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 300px;
`;
const InfoText = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.6;
  color: white;
  text-align: center;
  margin-bottom: 50px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.3);
`;

function Info() {
  const [position, setPosition] = useState(0);
  function onScroll() {
    console.log(window.scrollY);
    setPosition(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <InfoContainer>
      <InfoText
        style={{
          opacity: (position - 250) / 1000,
          transform: `translateY(${position / 2}px),
          `,
        }}
      >
        <div>
          <div>E-Town : U-Pick 은 E-Sport NFT 마켓플레이스 입니다.</div>
          <div>우리는 새로운 무역 생태계를 조성합니다.</div>
          <div>
            게이머들은 수집하는 것을 좋아합니다. 그들은 물건에 대한 투기적
            가치와{" "}
          </div>
          <div>시장에서 그것들을 큰 거래로 바꾸면서,</div>
          <div>이들 노력의 일부를 실제 달러로 벌기 위해</div>
          <div>
            다시 파는 것을 좋아합니다. 블록체인에서 이미 이런 일은 일어나고
            있습니다.{" "}
          </div>
        </div>
      </InfoText>
    </InfoContainer>
  );
}

export default Info;