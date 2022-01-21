import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

const BestNftContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 100px 0;
  gap: 100px;
`;

const BestNftBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-items: flex-start;
  gap: 50px;
`;
const BestNftTitle = styled.h1`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  font-size: 40px;
  color: #5800ff;
`;

const BestOne = styled.div`
  border: 2px solid black;
  text-align: center;
  margin-bottom: 50px;
  padding: 200px 100px;
`;
const BestTwo = styled.div`
  border: 2px solid black;
  text-align: center;
  margin-bottom: 50px;
  padding: 200px 100px;
`;
const BestThree = styled.div`
  border: 2px solid black;
  text-align: center;
  margin-bottom: 50px;
  padding: 200px 100px;
`;

function BestNft() {
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
    <BestNftContainer>
      <div
        style={{
          opacity: (position - 650) / 1000,
          transform: `translateY(${position / 2}px),
          `,
        }}
      >
        <BestNftTitle>BEST NFT</BestNftTitle>
      </div>
      <BestNftBox
      /*style={{
            opacity: (position - 670) / 1000,
            transform: `translateY(${position / 2}px),
          `,
          }}*/
      >
        <BestOne>내용1</BestOne>
        <BestTwo>내용2</BestTwo>
        <BestThree>내용3</BestThree>
      </BestNftBox>
    </BestNftContainer>
  );
}

export default BestNft;
