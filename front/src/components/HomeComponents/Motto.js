import React from "react";
import styled from "styled-components";
import back from "../../back.png";
import game1 from "../../home.gif";
import logo_text from "../../logo_text.png";

const Mottos = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 1000px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const MottoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const MottoImg1 = styled.div`
  //margin-top: 152px;
  padding: 1rem;
  //border: dotted 2px yellow;
  img {
    padding: 1rem;
    //border: dotted 2px blue;
    width: 100%;
    height: 100%;
    //-webkit-transform: scale(2);
  }
  position: absolute;
`;

const MottoImg2 = styled.div`
  padding: 1rem;
  //border: dotted 2px whitesmoke;
  img {
    padding: 1rem;
    //border: dotted 2px whitesmoke;
    width: 100%;
    height: 100%;
    transform:scale(1.8);
    padding-bottom: 1.5rem;
  }
  position: absolute;
`;

const MottoImg3 = styled.div`
  padding: 1rem;
  //border: dotted 2px green;
  display: flex;
  justify-content: center;
  align-content: center;
  img {
    width: 60%;
    height: 60%;
  }
  position: absolute;
`;

function Motto() {
  return (
    <Mottos>
      <MottoContainer>
        <MottoImg1>
          <img src={back} />
        </MottoImg1>
        <MottoImg2>
          <img src={game1} />
        </MottoImg2>
        <MottoImg3>
          <img src={logo_text} />
        </MottoImg3>
      </MottoContainer>
    </Mottos>
  );
}

export default Motto;
