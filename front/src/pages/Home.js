import React from "react";
import styled from "styled-components";
import Team from "../components/Team";
import Partner from "../components/Partner";
import Motto from "../components/Motto";
import Info from "../components/Info";
import BestNft from "../components/BestNft";
import Signature from "../components/Signature";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  color: white;
`;

function Home() {
  return (
    <HomeContainer>
      <Motto />
      <Info />
      <BestNft />
      <Signature />
      <Team />
      <Partner />
    </HomeContainer>
  );
}

export default Home;
