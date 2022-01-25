import React, { useState, useEffect } from 'react';
import {
  useStore,
  useClickedItem,
  //useSign,
  useClickedItemGroupList,
  useBidState,
  useModalSubmitData,
} from '../utils/store';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  submitMultiBid,
  submitAlreadyBid,
  submitAddJoinerGroup,
  submitSell,
} from '../utils/data';
import ModalComponent from '../components/Modal';
import ModalSubmit from '../components/ModalSubmit';
import mainImage from '../mainImage.jpg';

const TotalPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: white;
  background-image: url(${mainImage});
  background-size: cover;
`;
const PageTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 1rem;
  color: white;
  display: flex;
  justify-content: center;
`;
const MultiAuctionPage = styled.div`
  flex: 2 0 0;
  display: flex;
  flex-direction: row;
`;
/* (Start)LeftSide */
const PreViewNFT = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  align-items: center;
`;
const PreViewNFTImg = styled.div`
  width: 300px;
  height: 300px;
  img {
    width: 295px;
    height: 295px;
  }
`;
const PreViewNFTInfo = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const PreViewNFTInfoName = styled.h2``;
const PreViewNFTInfoPrice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
/* (End)LeftSide */

/* (Start)RightSide */
const MultiAuctionInfo = styled.div`
  flex: 2 0 0;
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;
const NFTInfo = styled.div`
  flex: 1 0 0;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 1rem;
  border-bottom: solid 1px black;
`;
const NFTDate = styled.div``;
const NameIPFSMetadata = styled.h2`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const MultiAuctionRltContainer = styled.div`
  flex: 2 0 0;
  margin: 1rem;
  display: flex;
  flex-direction: row;
  padding-bottom: 1rem;
  border-bottom: solid 1px black;
`;
const RemainingContainer = styled.div`
  flex: 1 0 0;
  border-right: solid 1px black;
`;
const RemainingPrice = styled.div`
  font-size: 2rem;
  font-weight: 200;
`;
const MaxBidder = styled.div`
  flex: 1 0 0;
  border-left: solid 1px black;
`;
const MaxBiddingPrice = styled.div`
  font-size: 2rem;
  font-weight: 200;
`;
const BiddingContainer = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 1rem;
  border-bottom: solid 1px black;
`;
const BiddingOwnerSituation = styled.div`
  display: flex;
  flex-direction: row;
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

/* (Start)List Part */
/* (Start)List Part-Header */
// List 전체를 담는 공간
const BidListContainer = styled.div`
  flex: 15 0 0;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  border: solid 2px gainsboro;
  overflow: auto;
`;
// ListHeader를 담는 공간
const BidListHeaderContainer = styled.div`
  margin: 0.5rem;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
// ListHeaderJoiners
const BidHeaderJoiners = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
`;
// ListHeaderDate
const BidHeaderDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
`;
// ListHeaderPricePer
const BidHeaderPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
`;
// ListHeaderButtonSector
const BidHeaderButtonSector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
`;
/* (End)List Part-Header */
/* (Start)List Part-Items */
// ListItem을 담는 공간
const BidListItemContainer = styled.div`
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: gainsboro;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
// ListItemJoiner
const BidItemJoiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex: 1 0 0;
`;
// ListItemDate
const BidItemDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex: 1 0 0;
`;
// ListItemPrice
const BidItemPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex: 1 0 0;
`;
// BidButtonContainer
const BidButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex: 1 0 0;
`;
// ListItemUpdateButton
const BidItemUpdateButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 40px;
  border-radius: 6px;
  text-align: center;
  color: #f4f4f4;
  border: none;
  background-color: #fe7e6d;
  font-weight: bold;
  cursor: pointer;
  padding: 0px 1.25rem;
  letter-spacing: 2px;
  color: black;
  :hover {
    opacity: 0.7;
  }
`;
// ListItemDeleteButton
const BidItemDeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 40px;
  border-radius: 6px;
  text-align: center;
  color: #f4f4f4;
  border: none;
  background-color: #fe7e6d;
  font-weight: bold;
  cursor: pointer;
  padding: 0px 1.25rem;
  letter-spacing: 2px;
  color: black;
  :hover {
    opacity: 0.7;
  }
`;
// ListItemDeleteButton
const BidItemSellButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 40px;
  border-radius: 6px;
  text-align: center;
  color: #f4f4f4;
  border: none;
  background-color: #fe7e6d;
  font-weight: bold;
  cursor: pointer;
  padding: 0px 1.25rem;
  letter-spacing: 2px;
  color: black;
  :hover {
    opacity: 0.7;
  }
`;
/* (End)List Part-Items */
/* (End)List Part */
/* (End)RightSide */

function MultiAuction() {
  let navigate = useNavigate();
  // user: accessToken, coin, id, master, userAddress
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  // id: multiauctiondatas findAll
  const id = useStore((state) => state.id);
  // clickedItem: clicked-nft Info(created_at, description, id, imgURI, name, price, tokenId, tokenURI, user=tokenOwnerAddress)
  const clickedItem = useClickedItem((state) => state.clickedItem);
  //const [sign, setSign] = useSign((state) => [state.sign, state.setSign]);
  //const setId = useStore((state) => state.setId);

  // clickedItemGroupList: multiauctiondatas findAll
  const clickedItemGroupList = useClickedItemGroupList(
    (state) => state.clickedItemGroupList
  );
  //console.log("test-clickedItemGroupList",clickedItemGroupList)
  const { fetchClickedItemGroup } = useClickedItemGroupList();
  const bidState = useBidState((state) => state.bidState);
  const { fetchBidState } = useBidState();

  //??
  const [clickedBidList, setClickedBidList] = useState();
  const [bid, setBid] = useState();
  const [bidMessage, setBidMessage] = useState();

  useEffect(() => {
    fetchClickedItemGroup();
    const currentAddress = window.web3.currentProvider.selectedAddress;
    const metadata = {
      tokenId: id,
      currentAddress: currentAddress,
    };
    fetchBidState(metadata);
  }, []);

  // modal
  const [checkBidToModal, setCheckBidToModal] = useState(true);
  const [checkSellModal, setCheckSellModal] = useState(true);
  const [modalSubmitData, setModalSubmitData] = useModalSubmitData((state) => [
    state.modalSubmitData,
    state.setModalSubmitData,
  ]);
  const onClickModal = (e) => {
    console.log(e);
    setCheckBidToModal((prev) => !prev);
  };

  const onSellModal = () => {
    setCheckSellModal((prev) => !prev);
  };
  // modal

  const onClickMultiBidding = async () => {
    const currentAddress = window.web3.currentProvider.selectedAddress;
    const metadata = {
      tokenId: id,
      tokenOwnerAddress: clickedItem.user,
      bid: bid,
      currentAddress: currentAddress,
      //signature: sign,
    };
    const submitMultiBidData = await submitMultiBid(metadata);
    console.log('submitMultiBidData', submitMultiBidData);
    window.location.assign('http://localhost:3000');

    setBid('');
  };

  const onChangeBid = (e) => {
    console.log(e.target.value);
    setBid(e.target.value);
  };

  //const AlreadyBid = async () => {
  //  const currentAddress = window.web3.currentProvider.selectedAddress;
  //  const metadata = {
  //    tokenId: id,
  //    currentAddress: currentAddress,
  //  };
  //  const submitAlreadyBidData = await submitAlreadyBid(metadata);
  //  console.log("submitAlreadyBidData", submitAlreadyBidData);
  //  //window.location.assign('http://localhost:3000');
  //  //setBid('');
  //};

  const onClickToSell = async () => {
    //onSellModal();
    // console.log(clickFetchList);
    const metadata = {
      tokenId: id,
      tokenOwnerAddress: clickFetchGroupList[0]?.tokenOwnerAddress,
      bidAddressNPrice: clickFetchGroupList[0]?.multiAuctionAddressList,
      //bidPrice: e.bidPrice,
      type: 'multi',
    };
    console.log('onClickToSell-multi-metadata', metadata);
    //setModalSubmitData(metadata);
    await submitSell(metadata);
  };

  //const onClickToJoin = async (e) => {
  //  console.log("e", e);
  //  const currentAddress = window.web3.currentProvider.selectedAddress;
  //  const metadata = {
  //    GroupInfo: e,
  //    currentAddress: currentAddress,
  //  };
  //  console.log("metadata", metadata);
  //  const submitDataAddJoinerGroup = await submitAddJoinerGroup(metadata);
  //  window.location.assign('http://localhost:3000');
  //}

  console.log('clickedItemGroupList', clickedItemGroupList);
  const clickFetchGroupList = clickedItemGroupList.filter(
    (data) => data.tokenId === Number(id)
  );
  console.log('clickFetchGroupList', clickFetchGroupList);

  //const [totalBid, setTotalBid] = useState();
  const TotalBid = clickFetchGroupList[0]?.multiAuctionAddressList?.reduce(
    (prev, current) => {
      console.log(prev.bidPrice, current.bidPrice);
      return prev.bidPrice + current.bidPrice;
    }
  );
  //setTotalBid(TotalBid)
  //console.log("totalBid", totalBid)

  const max = clickFetchGroupList[0]?.multiAuctionAddressList?.reduce(function (
    prev,
    current
  ) {
    return prev?.bidPrice > current?.bidPrice ? prev : current;
  }); //returns object
  console.log('max', max);
  const maxBidAddress =
    max?.multiAuctionAddress?.slice(0, 6) +
    '...' +
    max?.multiAuctionAddress?.slice(-5);

  return (
    <TotalPage>
      {/*!checkBidToModal ? (
        <ModalComponent bidMessage={bidMessage} onClickModal={onClickModal} />
      ) : !checkSellModal ? (
        <ModalSubmit onSellModal={onSellModal} />
      ) : null*/}
      {/* <ModalComponent onClickModal={onClickModal} /> */}
      <PageTitle>MultiAuction</PageTitle>
      <MultiAuctionPage>
        <PreViewNFT>
          <PreViewNFTImg>
            <img src={clickedItem?.imgURI} alt="preview-img" />
          </PreViewNFTImg>
          <PreViewNFTInfo>
            <PreViewNFTInfoName>{clickedItem?.description}</PreViewNFTInfoName>
            <PreViewNFTInfoPrice>
              <i className="fab fa-btc"></i>
              <h2>{clickedItem?.price}</h2>
            </PreViewNFTInfoPrice>
          </PreViewNFTInfo>
        </PreViewNFT>
        <MultiAuctionInfo>
          <NFTInfo>
            <NFTDate>
              <span>상품등록 시간: </span>
              <span>{clickedItem?.created_at}</span>
            </NFTDate>
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
          </NFTInfo>
          <MultiAuctionRltContainer>
            <RemainingContainer>
              {true ? <div>Remaining Bid</div> : <div>Current bid</div>}
              <RemainingPrice>
                <i className="fab fa-btc"></i>
                {clickedItem?.price - TotalBid}
              </RemainingPrice>
            </RemainingContainer>
            <MaxBidder>
              {true ? <div>MaxBidder</div> : <div>Ends in</div>}
              {true ? (
                <MaxBiddingPrice>
                  {max?.multiAuctionAddress
                    ? maxBidAddress
                    : '참여자가 없습니다.'}
                </MaxBiddingPrice>
              ) : (
                <MaxBiddingPrice>2h 21m 50s</MaxBiddingPrice>
              )}
            </MaxBidder>
          </MultiAuctionRltContainer>
          {clickedItem.user !== user.userAddress ? (
            <BiddingContainer>
              {/* AlreadyBid ? (1) : (0) */}
              <label>원하는 가격을 입력하세요!</label>
              <BiddingInput>
                <input
                  type="text"
                  placeholder="ETH"
                  value={bid}
                  onChange={(e) => onChangeBid(e)}
                ></input>
                <button onClick={onClickMultiBidding}>Bid</button>
              </BiddingInput>
            </BiddingContainer>
          ) : (
            <BiddingContainer>
              <BiddingOwnerSituation>
                본인의 NFT 입니다.
                <BidItemSellButton onClick={() => onClickToSell()}>
                  판매
                </BidItemSellButton>
              </BiddingOwnerSituation>
            </BiddingContainer>
          )}
          <BidListContainer>
            <BidListHeaderContainer>
              <BidHeaderJoiners>참가자</BidHeaderJoiners>
              <BidHeaderDate>생성날짜</BidHeaderDate>
              <BidHeaderPrice>참가금액</BidHeaderPrice>
              <BidHeaderButtonSector>비고</BidHeaderButtonSector>
            </BidListHeaderContainer>
            {clickFetchGroupList[0]?.multiAuctionAddressList?.map((el) => {
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
              const newUserAddress =
                el?.multiAuctionAddress?.slice(0, 6) +
                '...' +
                el?.multiAuctionAddress?.slice(-5);
              return (
                <BidListItemContainer key={el?._id}>
                  <BidItemJoiner>{newUserAddress}</BidItemJoiner>
                  <BidItemDate>{rDate}</BidItemDate>
                  <BidItemPrice>{el?.bidPrice}</BidItemPrice>
                  {el?.multiAuctionAddress !=
                  clickFetchGroupList[0].tokenOwnerAddress ? (
                    <BidButtonContainer>
                      <BidItemUpdateButton /*onClick={() => onClickToJoin(el)}*/
                      >
                        수정
                      </BidItemUpdateButton>
                      <BidItemDeleteButton>취소</BidItemDeleteButton>
                    </BidButtonContainer>
                  ) : (
                    <BidButtonContainer>
                      <BidItemSellButton onClick={() => onClickToSell(el)}>
                        판매
                      </BidItemSellButton>
                    </BidButtonContainer>
                  )}
                </BidListItemContainer>
              );
            })}
          </BidListContainer>
        </MultiAuctionInfo>
      </MultiAuctionPage>
    </TotalPage>
  );
}

export default MultiAuction;
