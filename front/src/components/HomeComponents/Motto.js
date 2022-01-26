import React from "react";
import styled from "styled-components";
import back from "../../back.png";
import game1 from "../../game1.gif";
import logo_text from "../../logo_text.png";

const Mottos = styled.div`
  display: flex;
  height: 1000px;
  width: 100%;
  flex-direction: column;
  margin-bottom: 100px;
`;

const MottoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const MottoImg1 = styled.div`
  margin-top: 152px;
  img {
    width: 1300px;
    height: 98%;
  }
  position: relative;
`;

const MottoImg2 = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
  position: absolute;
`;

const MottoImg3 = styled.div`
  margin-top: 150px;
  margin-left: 300px;
  img {
    width: 80%;
    height: 80%;
  }
  position: absolute;
`;

function Motto() {
  return (
    <Mottos>
      <MottoContainer>
        <MottoImg1>
          <img src={game1} />
        </MottoImg1>
        <MottoImg2>
          <img src={back} />
        </MottoImg2>
        <MottoImg3>
          <img src={logo_text} />
        </MottoImg3>
      </MottoContainer>
    </Mottos>
  );
}

export default Motto;
