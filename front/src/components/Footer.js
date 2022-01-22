import React, { FunctionComponent } from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  color: white;
  text-align: center;
  line-height: 1.5;
  font-size: 10px;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <br />
      <div> ©2022 E-Town : U-Pick </div>
      <div></div>
    </FooterWrapper>
  );
};

export default Footer;
