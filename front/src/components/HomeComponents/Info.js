import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import back2 from '../../images/back2.png';

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 300px;
  background-image: url(${back2});
  background-size: cover;
  background-repeat: no-repeat;
  margin: 10px;
`;
const InfoText = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.6;
  color: white;
  text-align: center;
  margin-bottom: 50px;
  margin-top: 130px;
  padding: 50px;
  background-color: rgba(255, 255, 255, 0.3);
`;

function Info() {
  const [position, setPosition] = useState(0);
  function onScroll() {
    console.log(window.scrollY);
    setPosition(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
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
          <div>E-SPORTS TOWN 은 E-Sport NFT 마켓플레이스 입니다.</div>
          <div>우리는 새로운 무역 생태계를 조성합니다.</div>
          <div>게이머들은 수집하는 것을 좋아합니다.</div>
          <div>
            그들은 물건에 대한 투기적 가치와 시장에서 그것들을 큰 거래로
            바꾸면서,
          </div>
          <div>
            이들 노력의 일부를 실제 달러로 벌기 위해 다시 파는 것을 좋아합니다.
          </div>
          <div>블록체인에서 이미 이런 일은 일어나고 있습니다.</div>
        </div>
      </InfoText>
    </InfoContainer>
  );
}

export default Info;
