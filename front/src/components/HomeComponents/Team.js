import React from "react";
import styled from "styled-components";
import mimo_1 from "../../mimo_yj.png";
import mimo_2 from "../../mimo_2.png";
import mimo_3 from "../../mimo_3.png";
import mimo_4 from "../../mimo_4.png";
import members from "../../members.png";

const TeamContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 100px;
  padding: 0px;
  background-color: black;
  margin-bottom: 10rem;
`;
const TeamTitle = styled.h1`
  margin: 2rem 0;
  color: white;
  display: flex;
  justify-content: center;
  font-size: 5rem;
  color: red;
`;
const TeamImg = styled.div`
  border-radius: 15px;
  display: flex;
  justify-content: center;

  img {
    width: 60%;
    height: 60%;
  }
`;

function Team() {
  return (
    <>
      <TeamTitle>Membership</TeamTitle>
      <TeamContainer>
        <TeamImg>
          <img src={members} />
        </TeamImg>
      </TeamContainer>
    </>
  );
}

export default Team;