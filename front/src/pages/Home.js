import React from 'react';
import styled from 'styled-components';
import mimo_1 from '../mimo_yj.png';
import mimo_2 from '../mimo_2.png';
import mimo_3 from '../mimo_3.png';
import mimo_4 from '../mimo_4.png';
import nexon from '../nexon.jpeg';
import test from '../test.gif';
import { useEffect, useState } from "react";

const HomeContainer = styled.div`
  height: 100%;
  width: 100%
  background-image: backgroundImage;
  background-size: cover;
`

const MotooContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 200px 0;
    align-items: flex-start;
`
const MottoImg =styled.div`
    padding-top: 40px;
    padding-bottom: 40px;
    img {
        width: 612px;
        height: 612px;
      }

`

const MottoContent = styled.div`
    display: flex;
    align-items: baseline;
    flex-direction: column;
    justify-content: center;
    padding-left: 80px;
    padding-top: 50px;
    padding-bottom: 50px;
`

const MottoTitle = styled.h1`
    font-size: 57px;
    line-height: 57px;
    margin-bottom: 28px;
    margin-right: 28px;
    color: white;
`

const MottoText = styled.h4`
    margin-bottom: 28px;
    margin-top: 0px;
    font-size: 21px;
    line-height: 2em;
    color: white;
    font-family: Shapiro, sans-serif;
    font-size: 24px;
    word-break: break-all;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 100px 0;
`
const InfoText = styled.div`
    font-size: 32px;
    font-weight: 700;
    line-height: 1.6;
    color: white;
    text-align: center;
    margin-bottom: 50px;
`
const BestNftContainer= styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    padding: 100px 0;
    align-items: flex-start;
`
const BestNftTitle = styled.h1`
  margin-top: 1rem;
  color: white;
  display: flex;
  justify-content: center;
  font-size: 40px;
  padding: 100px 0;
`

const BestOne = styled.div`
    border:2px solid white;
    color: white;
    text-align: center;s
    margin-bottom: 50px;
    padding: 200px 100px;
`
const BestTwo = styled.div`
    border:2px solid white;
    color: white;
    text-align: center;
    margin-bottom: 50px;
    padding: 200px 100px;
`
const BestThree = styled.div`
    border:2px solid white;
    color: white;
    text-align: center;s
    margin-bottom: 50px;
    padding: 200px 100px;

`
const Signature = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 200px 0;
    color: white;
    line-height: 2em;
    font-size: 24px;
`

const SignatureTitle = styled.h1`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: white;
  display: flex;
  justify-content: center;
  font-size: 40px;
`

const Partner = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 200px 0;
`
const PartnerTitle = styled.h1`
  margin-top: 1rem;
  color: white;
  display: flex;
  justify-content: center;
  font-size: 40px;
`
const PartnerImg = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
    overflow-x: scroll;
    img {
        width: 300px;
        height: 300px;
      }
`
const PartnerInfo = styled.div`
 display: flex;
 align-items: center;
 flex-direction: column;
 padding: 10px 0;
 color: white;
 margin-top: 10px;
 font-size: 24px;
 word-break: break-all;
 line-height: 2em;
`

const Team = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 200px 0;
`
const TeamTitle = styled.h1`
  margin-top: 1rem;
  color: white;
  display: flex;
  justify-content: center;
  font-size: 40px;
`
const TeamImg = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
    img {
        width: 300px;
        height: 300px;
      }
`

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
`


function Home() {
const [position, setPosition] = useState(0);
function onScroll() {
  console.log(window.scrollY)
  setPosition(window.scrollY);
}
useEffect(() => {
  window.addEventListener("scroll", onScroll);
  return () => {
    window.removeEventListener("scroll", onScroll);
  };
}, []);


    return (
        <HomeContainer>
      <MotooContainer>
            <MottoImg>
            <img src={test} />
            </MottoImg>

            <MottoContent>
            <MottoTitle>
            Choose and Imagine
            </MottoTitle>
            <MottoText>
            <div>U never know how amazing</div>
            <div>your NFT Card is in E-sport</div>
            <div>before you get to know what it is</div>
            <div>선택하고 상상해라.</div>
            <div>넌 너의 NFT 카드가 얼마나 놀라운지 절대 모를거다</div>
            <div>이게 진짜 뭔지 알기전까지</div>
            </MottoText>
            </MottoContent>
            </MotooContainer>

            <Info >
            <InfoText style={{
          opacity: (position -250) / 1000,
          transform: `translateY(${position / 2}px),
          `
        }}>
            <p>
            <div>E-Town : U-Pick 은 E-Sport NFT 마켓플레이스 입니다.</div>
            <div>우리는 새로운 무역 생태계를 조성합니다.</div>
            <div>게이머들은 수집하는 것을 좋아합니다. 그들은 물건에 대한 투기적 가치와 </div>
            <div>시장에서 그것들을 큰 거래로 바꾸면서, 이들 노력의 일부를 실제 달러로 벌기 위해</div>
            <div>다시 파는 것을 좋아합니다. 블록체인에서 이미 이런 일은 일어나고 있습니다.</div>
            </p>
            </InfoText>
            </Info>
            
            <div style={{
          opacity: (position -670) / 1000,
          transform: `translateY(${position / 2}px),
          `
        }}>
            <BestNftTitle>BEST NFT</BestNftTitle>
            <BestNftContainer>
                <BestOne>
                    내용1
                </BestOne>

                <BestTwo>
                    내용2
                </BestTwo>

                <BestThree>
                    내용3
                </BestThree>
            </BestNftContainer>
            </div>

            <Signature>
            <SignatureTitle>E-Town : U-Pick 특징</SignatureTitle>

            <div>1) 우리는 E-Sport에 진심인 자들입니다.</div>
            <div>매주마다 투표시스템을 통해 최고의 인기 작품 3개를</div>
            <div>선정하여 메인페이지에 노출되도록 합니다.</div>

            <div>2) 우리는 유일한 것을 좋아합니다. </div>
            <div>E-Sport의 거대한 산업규모에서 나만의 콜렉션은</div>
            <div>수집하는 걸 즐기는 게이머들에게 매력적으로 다가갈 것 입니다.</div>


            <div>3) 우리는 "순간의 찰나"에 집착합니다.</div>
            <div>E-Town : U-Pick은 E-Sport 에서의 시각적인 명장면을 통해 오프라인 스포츠 경기와 같은 짜릿함을 선사합니다. </div>
            <div>이러한 짜릿함은 나만의 것으로 남기고픈 소유욕으로 나타날 것 입니다.</div>

            </Signature>

            <Team>
            <TeamTitle>TEAM</TeamTitle>
            <TeamImg>
            <img src={mimo_1} />
            <img src={mimo_2} />
            <img src={mimo_3} />
            <img src={mimo_4} />
            </TeamImg>
            <TeamText>
                <div>SangBeom(Leader): 블록체인계의 히딩크 (슈퍼 리더 자질)</div>
                <div>YeongDeok(Back): 블록체인계의 박지성 (공 수 모든것을 아우르는 능력자) </div>
                <div>ChangNam(Disign): 블록체인계의 이동국 (떠 먹여주면 원샷원킬)</div>
                <div>YeJin(Front): 블록체인계의 안정환 (재치, 센스, 미모, 실력 두루 갖춘 마법사)</div>
            </TeamText>
            </Team>

        <Partner>
          <PartnerTitle>PARTNERSHIPS</PartnerTitle>
          <PartnerImg>
            <img src={nexon} />
            <img src={mimo_2} />
            <img src={mimo_3} />
            <img src={mimo_4} />
          </PartnerImg>
          <PartnerInfo>
              <div>SangBeom(Leader): 블록체인계의 히딩크 (슈퍼 리더 자질)</div>
              <div>YeongDeok(Back): 블록체인계의 박지성 (공 수 모든것을 아우르는 능력자) </div>
              <div>ChangNam(Disign): 블록체인계의 이동국 (떠 먹여주면 원샷원킬)</div>
              <div>YeJin(Front): 블록체인계의 안정환 (재치, 센스, 미모, 실력 두루 갖춘 마법사)</div>
          </PartnerInfo>
        </Partner>

      </HomeContainer>
    );
}

export default Home;