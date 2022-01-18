import React, { useState, useEffect } from 'react';
import {
  useStore,
  useClickedItem,
  useSign,
  useClickedItemBidList,
} from '../utils/store';
import { useNavigate } from 'react-router-dom';
import { dummydata } from '../utils/dummyData';
import styled from 'styled-components';
import { submitBid, getClickedItemBidList } from '../utils/data';
import ModalComponent from '../components/Modal';

const TotalPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 1rem;
  color: darksalmon;
`;

const AuctionNFT = styled.div`
  flex: 2 0 0;
  display: flex;
  flex-direction: row;
`;

const ImgNFT = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  align-items: center;
`;

const NftPreviewImg = styled.div`
  width: 300px;
  height: 300px;

  img {
    width: 295px;
    height: 295px;
  }
`;

const ProfileNFT = styled.div`
  flex: 2 0 0;
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

const InfoNFT = styled.div`
  flex: 1 0 0;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 1rem;
  border-bottom: solid 1px black;
`;

const NameIPFSMetadata = styled.h2`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const BidRltContainer = styled.div`
  flex: 2 0 0;
  margin: 1rem;
  display: flex;
  flex-direction: row;
  padding-bottom: 1rem;
  border-bottom: solid 1px black;
`;

const WinningCurrent = styled.div`
  flex: 1 0 0;
  border-right: solid 1px black;
`;

const WinningCurrent_Price = styled.div`
  font-size: 2rem;
  font-weight: 200;
`;

const WinnerEnd = styled.div`
  flex: 1 0 0;
  border-left: solid 1px black;
`;

const BiddingContainer = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 1rem;
  border-bottom: solid 1px black;
`;

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
`;

const BidListContainer = styled.div`
  flex: 15 0 0;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  border: solid 2px gainsboro;
  overflow: auto;
`;

const BidListItemContainer = styled.div`
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: gainsboro;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BidItemName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BidItemPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BidItemCreated = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BidItemSellButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  padding: 5px;
  font-weight: 600;
  :hover {
    color: #fe7e6d;
  }
`;

const ImgDescription = styled.div`
  margin: 20px;
`;

function Auction({ clickedItemList }) {
  let navigate = useNavigate();
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  const id = useStore((state) => state.id);
  const clickedItem = useClickedItem((state) => state.clickedItem);
  const [sign, setSign] = useSign((state) => [state.sign, state.setSign]);

  const { fetchClickedItem } = useClickedItemBidList();

  const [clickedBidList, setClickedBidList] = useState();
  const [bid, setBid] = useState();
  const [bidMessage, setBidMessage] = useState();

  // modal
  const [checkBidToModal, setCheckBidToModal] = useState(true);
  const onClickModal = (e) => {
    console.log(e);
    setCheckBidToModal((prev) => !prev);
  };

  // modal

  console.log('nah', clickedItemList);

  const clickFetchList = clickedItemList.filter(
    (data) => data.tokenId === Number(id)
  );
  const max = clickFetchList[0]?.biddingList?.reduce(function (prev, current) {
    return prev?.bidPrice > current?.bidPrice ? prev : current;
  }); //returns object

  const maxBidAddress =
    max?.bidAddress?.slice(0, 6) + '...' + max?.bidAddress?.slice(-5);

  console.log('After', clickFetchList);
  console.log('Max', max?.bidPrice);
  const onClickBidding = async () => {
    const currentAddress = window.web3.currentProvider.selectedAddress;
    const metadata = {
      currentAddress: currentAddress,
      tokenId: id,
      tokenOwnerAddress: clickedItem.user,
      bid: bid,
      signature: sign,
    };
    const submitData = await submitBid(metadata);
    console.log('checkBidToModal', submitData);

    if (
      submitData.message === 'lowerThanMax' ||
      submitData.message === 'NoMoney'
    ) {
      console.log('after submitData.message!!', submitData.message);
      setBidMessage(submitData.message);
      setCheckBidToModal(false);
    } else {
      console.log('AFTER submitData.message!!', submitData.message);
      setBidMessage(submitData.message);
      setCheckBidToModal(true);
      // navigate('/');
      window.location.assign('http://localhost:3000');
      // window.location.reload(false);
    }
    setBid('');
  };

  const onChangeBid = (e) => {
    console.log(e.target.value);
    setBid(e.target.value);
  };

  console.log(
    'clicked!',
    clickFetchList[0]?.tokenOwnerAddress,
    'user!',
    user.userAddress
  );

  return (
    <TotalPage>
      {!checkBidToModal ? (
        <ModalComponent bidMessage={bidMessage} onClickModal={onClickModal} />
      ) : null}
      {/* <ModalComponent onClickModal={onClickModal} /> */}
      <PageTitle>Auction</PageTitle>
      <AuctionNFT>
        <ImgNFT>
          <NftPreviewImg>
            <img src={clickedItem?.imgURI} alt="preview-img" />
          </NftPreviewImg>
          <ImgDescription>
            <h2>{clickedItem?.description}</h2>
          </ImgDescription>
        </ImgNFT>
        <ProfileNFT>
          <InfoNFT>
            <div>
              <span>상품등록 시간: </span>
              <span>{clickedItem?.created_at}</span>
            </div>
            <NameIPFSMetadata>
              {clickedItem?.name}
              <a href={clickedItem?.imgURI} target="_blank" rel="noreferrer">
                <i className="fas fa-layer-group"></i>
                ipfs
              </a>
              <a href={clickedItem?.tokenURI} target="_blank" rel="noreferrer">
                <i className="fas fa-server"></i>
                metadata
              </a>
            </NameIPFSMetadata>
          </InfoNFT>
          <BidRltContainer>
            <WinningCurrent>
              {true ? <div>현재 최고가</div> : <div>Current bid</div>}
              <WinningCurrent_Price>
                <i className="fas fa-bars"></i>
                {max?.bidPrice ? max?.bidPrice : '제시 금액이 없습니다.'}
              </WinningCurrent_Price>
            </WinningCurrent>
            <WinnerEnd>
              {true ? <div>최고가 제시 유저</div> : <div>Ends in</div>}
              {true ? (
                <WinningCurrent_Price>
                  {max?.bidAddress ? maxBidAddress : '최고가를 기록 해보세요!'}
                </WinningCurrent_Price>
              ) : (
                <WinningCurrent_Price>2h 21m 50s</WinningCurrent_Price>
              )}
            </WinnerEnd>
          </BidRltContainer>
          {clickFetchList[0]?.tokenOwnerAddress !== user.userAddress ? (
            <BiddingContainer>
              <label>원하는 가격을 제시 하세요!</label>
              <BiddingInput>
                <input
                  type="text"
                  placeholder="ETH"
                  value={bid}
                  onChange={(e) => onChangeBid(e)}
                ></input>
                <button onClick={onClickBidding}>Bid</button>
              </BiddingInput>
            </BiddingContainer>
          ) : (
            <BiddingContainer>원하는 가격을 결정 하세요!</BiddingContainer>
          )}
          <BidListContainer>
            <h3>bid listing</h3>
            {clickFetchList[0]?.biddingList?.map((el) => {
              let rDate = null;
              if (el?.created_at) {
                let date = el?.created_at.split('T');

                let newDate = date[0]?.split('-');
                let newtime = date[1]?.split('.');
                let newtime2 = newtime[0]?.split(':');
                let result = [...newDate, ...newtime2];
                let result1 = result.slice(0, 3).join('-');
                rDate = result1 + ' ' + newtime2.join(':');
              }
              return (
                <BidListItemContainer key={el?._id}>
                  <BidItemName>{el?.bidAddress}</BidItemName>
                  <BidItemCreated>{rDate}</BidItemCreated>
                  <BidItemPrice>{el?.bidPrice}</BidItemPrice>
                  {clickFetchList[0]?.tokenOwnerAddress === user.userAddress ? (
                    <BidItemSellButton>판매</BidItemSellButton>
                  ) : null}
                </BidListItemContainer>
              );
            })}
          </BidListContainer>
        </ProfileNFT>
      </AuctionNFT>
    </TotalPage>
  );
}

export default Auction;
