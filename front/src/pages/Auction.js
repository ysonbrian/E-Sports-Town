import React from 'react';
import { useStore } from '../utils/store';
import { dummydata } from '../utils/dummyData';
import styled from 'styled-components';

const TotalPage = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`

const PageTitle = styled.h1`
    margin-top: 1rem;
    color: darksalmon;
`

const AuctionNFT = styled.div`
    flex: 2 0 0;
    display: flex;
    flex-direction: row;
`

const ImgNFT = styled.div`
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    margin: 1rem;
    align-items: center;
`

const NftPreviewImg = styled.div`
  width: 300px;
  height: 300px;

  img {
    width: 295px;
    height: 295px;
  }
`

const ProfileNFT = styled.div`
    flex: 2 0 0;
    display: flex;
    flex-direction: column;
    margin: 1rem;
`

const InfoNFT = styled.div` 
    flex: 1 0 0;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 1rem;
    border-bottom: solid 1px black;
`

const NameIPFSMetadata = styled.h2`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`

const BidRltContainer = styled.div`
    flex: 2 0 0;
    margin: 1rem;
    display: flex;
    flex-direction: row;
    padding-bottom: 1rem;
    border-bottom: solid 1px black;
`

const WinningCurrent = styled.div`
    flex: 1 0 0;
    border-right: solid 1px black;
`

const WinningCurrent_Price = styled.div`
    font-size: 2rem;
    font-weight: 200;
`

const WinnerEnd = styled.div`
    flex: 1 0 0;
    border-left: solid 1px black;
`

const BiddingContainer = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 1rem;
    border-bottom: solid 1px black;
`

const BiddingInput = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: 10px;

    input {
        margin-top: 10px;
        margin-right: 5px;
        width: 55%;
        height: 100%;
    }

    button {
        margin-top: 10px;
        margin-left: 5px;
        width: 35%;
        height: 100%;
    }
`

const BidListContainer = styled.div`
    flex: 15 0 0;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    border: solid 2px gainsboro;
    overflow: auto;
`

const BidListItemContainer = styled.div`
    margin: 0.5rem;
    padding: 0.5rem;
    background-color: gainsboro;
    display: flex;
    flex-direction: row;
`

const BidItemName = styled.div`
    flex: 1 0 0;
    display: flex;
    align-items: flex-start;
`

const BidItemPrice = styled.div`
    flex: 1 0 0;
    display: flex;
    justify-content: flex-end;
`

function Auction() {

    const id = useStore((state) => state.id)
    console.log("auction-id : " + id);
    const data = dummydata.nft[id - 1];
    console.log(data);

    return (
        <TotalPage>
            <PageTitle>
                Auction
            </PageTitle>
            <AuctionNFT>
                <ImgNFT>
                    <NftPreviewImg>
                        {data !== undefined ?
                            <img src={data.imgURI} alt="preview-img" /> : <div></div>}
                    </NftPreviewImg>
                </ImgNFT>
                <ProfileNFT>
                    <InfoNFT>
                        <div>Aug 15 2021</div>
                        <NameIPFSMetadata>
                            NFT-name
                            <a>
                                <i className="fas fa-layer-group"></i>
                                ipfs
                            </a>
                            <a>
                                <i className="fas fa-server"></i>
                                metadata
                            </a>
                        </NameIPFSMetadata>
                    </InfoNFT>
                    <BidRltContainer>
                        <WinningCurrent>
                            {true ? <div>Winning bid</div> : <div>Current bid</div>}
                            <WinningCurrent_Price><i className="fas fa-bars"></i>49.99</WinningCurrent_Price>
                        </WinningCurrent>
                        <WinnerEnd>
                            {true ? <div>Winner</div> : <div>Ends in</div>}
                            {true ? <WinningCurrent_Price>max-power-eth</WinningCurrent_Price> : <WinningCurrent_Price>2h 21m 50s</WinningCurrent_Price>}
                        </WinnerEnd>
                    </BidRltContainer>
                    {true ?
                        <BiddingContainer>
                            <label>Minimum bid: 90.66 ETH</label>
                            <BiddingInput>
                                <input type='text' placeholder='ETH'></input>
                                <button>Bid</button>
                            </BiddingInput>
                        </BiddingContainer> : <BiddingContainer>Need to Login</BiddingContainer>}
                    <BidListContainer>
                        <h3>bid listing</h3>
                        {dummydata.bid.map((el) => {
                            return (
                                <BidListItemContainer>
                                    <BidItemName>{el.user}</BidItemName>
                                    <BidItemPrice>{el.bidmoney}</BidItemPrice>
                                </BidListItemContainer>
                            )
                        })}
                    </BidListContainer>
                </ProfileNFT>
            </AuctionNFT>
        </TotalPage>
    );
}

export default Auction;