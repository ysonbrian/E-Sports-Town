import React from 'react';
import { dummydata } from '../utils/dummyData';
import CardTemplate from '../components/CardTemplate';
import styled from 'styled-components';

const PageTitle = styled.h1`
    margin-top: 1rem;
    color: darksalmon;
`

const Profile_container = styled.div`
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
`

const Profile = styled.div`
    display: flex;
    flex-direction: column;
`

const ListContainer = styled.div`
  padding: 3rem;
  overflow: scroll;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const ListItem = styled.div`
  margin: 1rem;
  padding: 1rem;
`

const UserName = styled.div`
`

const PublicKey = styled.div`
`

const CollectionNumber = styled.div`
`

function Mypage() {
    return (
        <>
            <Profile_container>
                <PageTitle>
                    Mypage
                </PageTitle>
                <Profile>
                    <i className="far fa-user"></i>
                    <UserName>
                        {dummydata.nft[0].user}
                    </UserName>
                    <PublicKey>
                        PublicKey
                    </PublicKey>
                    <CollectionNumber>
                        Collection#
                    </CollectionNumber>
                </Profile>
                <PageTitle>
                    NFT List
                </PageTitle>
                <ListContainer>
                    {dummydata && dummydata.nft.slice(0).reverse().map((el) => {
                        return (
                            <ListItem>
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
            </Profile_container>
        </>
    );
}

export default Mypage;