import React from 'react';
import { useStore } from '../utils/store';
import CardTemplate from '../components/CardTemplate';
import { dummydata } from '../utils/dummyData';
import styled from 'styled-components';

const PageTitle = styled.h1`
    margin-top: 1rem;
    color: darksalmon;
`

const AuctionNFT = styled.div`
    flex: 2 0 0;
    background-color: cyan;
    display: flex;
    flex-direction: row;
`

const ImgNFT = styled.div`
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    margin: 1rem;
    border: solid 2px antiquewhite;
    align-items: center;
`

const ListItem = styled.div`
  margin: 1rem;
  padding: 1rem;
`

const ProfileNFT = styled.div`
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    margin: 1rem;
    border: solid 2px rosybrown;
`

const DateNFT = styled.div` 
    flex: 1 0 0;
    margin: 1rem;
    border: solid 2px darkorange;
`

const FinalBidContainer = styled.div`
    flex: 2 0 0;
    margin: 1rem;
    border: solid 2px violet;
`

const BidListContainer = styled.div`
    flex: 2 0 0;
    margin: 1rem;
    border: solid 2px khaki;
`

const OtherNFT = styled.div`
    flex: 1 0 0;
    background-color: darkcyan;
`

function Auction() {

    const id = useStore((state) => state.id)
    console.log("auction-id : " + id);
    const data = dummydata.nft[id - 1];
    console.log(data);

    return (
        <>
            <PageTitle>
                Auction
            </PageTitle>
            <AuctionNFT>
                <ImgNFT>
                    <ListItem>
                        {data !== undefined ?
                            <CardTemplate
                                id={data.id}
                                imgURI={data.imgURI}
                                user={data.user}
                                description={data.description}
                                price={data.price}
                                created_at={data.created_at}
                            /> : <div></div>}
                    </ListItem>
                </ImgNFT>
                <ProfileNFT>
                    <DateNFT>created date</DateNFT>
                    <FinalBidContainer>Winning bid</FinalBidContainer>
                    <BidListContainer>bid listing</BidListContainer>
                </ProfileNFT>
            </AuctionNFT>
            <OtherNFT>other nft infos</OtherNFT>
        </>
    );
}

export default Auction;