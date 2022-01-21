import React from "react";
import styled from "styled-components";

const SignatureContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 200px 0;
  color: white;
  line-height: 2em;
  font-size: 24px;
`;

const SignatureTitle = styled.h1`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: white;
  display: flex;
  justify-content: center;
  font-size: 40px;
  color: #5800ff;
`;

function Signature() {
  return (
    <SignatureContainer>
      <SignatureTitle>E-Town : U-Pick 특징</SignatureTitle>

      <div>1) 우리는 E-Sport에 진심인 자들입니다.</div>
      <div>매주마다 투표시스템을 통해 최고의 인기 작품 3개를</div>
      <div>선정하여 메인페이지에 노출되도록 합니다.</div>

      <div>2) 우리는 유일한 것을 좋아합니다. </div>
      <div>E-Sport의 거대한 산업규모에서 나만의 콜렉션은</div>
      <div>수집하는 걸 즐기는 게이머들에게 매력적으로 다가갈 것 입니다.</div>

      <div>3) 우리는 "순간의 찰나"에 집착합니다.</div>
      <div>
        E-Town : U-Pick은 E-Sport 에서의 시각적인 명장면을 통해 오프라인 스포츠
        경기와 같은 짜릿함을 선사합니다.{" "}
      </div>
      <div>
        이러한 짜릿함은 나만의 것으로 남기고픈 소유욕으로 나타날 것 입니다.
      </div>
    </SignatureContainer>
  );
}

export default Signature;
