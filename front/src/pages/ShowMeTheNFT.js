import React from 'react';
import { dummydata } from '../utils/dummyData';
import CardTemplate from '../components/CardTemplate';
import styled from 'styled-components';

const PageTitle = styled.h1`
    margin-top: 1rem;
    color: darksalmon;
`

const ListContainer = styled.div`
    padding: 3rem;
    overflow: scroll;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
`

const ListItem = styled.div`
  margin: 1rem;
  padding: 1rem;
`

function ShowMeTheNFT() {
    return (
        <>
            <PageTitle>
                ShowMeTheNFT
            </PageTitle>
            <ListContainer>
                {dummydata && dummydata.nft.slice(0).reverse().map((el) => {
                    return (
                        <ListItem key={el.id}>
                            <CardTemplate
                                id={el.id}
                                imgURI={el.imgURI}
                                user={el.user}
                                description={el.description}
                                price={el.price}
                                created_at={el.created_at}
                            />
                        </ListItem>
                    )
                })}
            </ListContainer>
        </>
    );
}

export default ShowMeTheNFT;