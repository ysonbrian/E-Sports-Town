import React from "react";
import styled from "styled-components";
import mimo_1 from "../mimo_yj.png";
import mimo_2 from "../mimo_2.png";
import mimo_3 from "../mimo_3.png";
import mimo_4 from "../mimo_4.png";

const TeamContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  padding: 100px;
`;
const TeamTitle = styled.h1`
  margin-top: 1rem;
  color: white;
  display: flex;
  justify-content: center;
  font-size: 40px;
  color: #5800ff;
`;
const TeamImg = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  img {
    width: 200px;
    height: 200px;
  }
`;

const TeamText = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px 0;
  color: white;
  margin-top: 10px;
  font-size: 24px;
  word-break: break-all;
  line-height: 2em;
`;

function Team() {
  return (
    <TeamContainer>
      <TeamTitle>TEAM</TeamTitle>
      <TeamImg>
        <img src={mimo_1} />
        <img src={mimo_2} />
        <img src={mimo_3} />
        <img src={mimo_4} />
      </TeamImg>
      <TeamText>
        <div>SangBeom(Leader): 블록체인계의 히딩크 (슈퍼 리더 자질)</div>
        <div>
          YeongDeok(Back): 블록체인계의 박지성 (공 수 모든것을 아우르는 능력자){" "}
        </div>
        <div>ChangNam(Disign): 블록체인계의 이동국 (떠 먹여주면 원샷원킬)</div>
        <div>
          YeJin(Front): 블록체인계의 안정환 (재치, 센스, 미모, 실력 두루 갖춘
          마법사)
        </div>
      </TeamText>
    </TeamContainer>
  );
}

export default Team;
