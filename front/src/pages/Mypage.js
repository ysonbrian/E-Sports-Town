import React from 'react';
import { dummydata } from '../utils/dummyData';
import CardTemplate from '../components/CardTemplate';
import styled from 'styled-components';
import { useStore } from '../utils/store';

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
    align-items: center;
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

const UserName = styled.div`
    margin: 2rem;
    border: solid 2px gainsboro;
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5rem;
    font-size: 1.5rem;

    i {
        font-size: 5rem;
    }
`

const PublicKey = styled.div`
`

const CollectionNumber = styled.div`
`

function Mypage() {

    const [user, setUser] = useStore((state) => [state.user, state.setUser]);


    return (
        <>
            <Profile_container>
                <PageTitle>
                    Mypage
                </PageTitle>
                <Profile>
                    <UserName>
                        <i className="far fa-user"></i>
                        {dummydata.nft[0].user}
                    </UserName>
                    <PublicKey>
                        {user?.userAddress}
                    </PublicKey>
                    <CollectionNumber>
                    </CollectionNumber>
                </Profile>
                <PageTitle>
                    NFT List
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
            </Profile_container>
        </>
    );
}

export default Mypage;