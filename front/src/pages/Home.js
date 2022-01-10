import React from 'react';
import styled from 'styled-components';

const PageTitle = styled.h1`
    margin-top: 1rem;
    color: darksalmon;
`

function Home() {
    return (
        <>
            <PageTitle>
                HomePage
            </PageTitle>
        </>
    );
}

export default Home;