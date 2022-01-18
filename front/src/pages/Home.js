import React from 'react';
import styled from 'styled-components';

const PageTitle = styled.h1`
  margin-top: 1rem;
  color: darksalmon;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid darksalmon;
`;

function Home() {
  return (
    <>
      <PageTitle>HomePage</PageTitle>
      <Container></Container>
    </>
  );
}

export default Home;
