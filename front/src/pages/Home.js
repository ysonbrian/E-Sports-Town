import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: rgb(33, 33, 39);
`;

const MainImg = styled.img`
  padding-top: 40px;
  padding-bottom: 40px;
`;

const MainContent = styled.div`
  display: flex;
  -webkit-box-align: baseline;
  align-items: baseline;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  order: 1;
  padding-left: 80px;
  padding-top: 40px;
  padding-bottom: 40px;
  color: white;
`;

const MainTitle = styled.h1`
  font-size: 57px;
  line-height: 57px;
  margin-bottom: 28px;
  margin-right: 28px;
`;

const MainText = styled.h4`
  margin-bottom: 28px;
  margin-top: 0px;
  font-size: 21px;
  line-height: 25px;
  color: rgb(255, 255, 255);
  font-family: Shapiro, sans-serif;
`;

function Home() {
  return (
    <>
      <Container>
        <MainImg></MainImg>

        <MainContent>
          <MainTitle>Choose and Imagine</MainTitle>
          <MainText>
            <div>U never know how amazing</div>
            <div>your NFT Card is in E-sport</div>
            <div>before you get to know what it is</div>
          </MainText>
        </MainContent>
      </Container>
    </>
  );
}

export default Home;
