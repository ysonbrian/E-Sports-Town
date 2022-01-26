import React, { useState, useEffect } from 'react';
import {
  useStore,
  useClickedItem,
  useClickedItemGroupList,
  useBidState,
  useModalSubmitData,
  useModalUpdateData
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
import ModalUpdate from '../components/ModalUpdate';
import mainImage from '../mainImage.jpg';
import Comment from '../components/Comment';

const TotalPage = styled.div`
  height: 100%;
  width: 100%;
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
  flex: 4 0 0;
  width: 300px;
  height: 300px;
  img {
    width: 295px;
    height: 295px;
  }
`;
const PreViewNFTInfo = styled.div`
  flex: 1 0 0;
  //border: solid brown 2px;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  a {
    text-decoration: none;
    color: white;
    display: flex;
    gap: 10px;
  }
  a:hover {
    opacity: 0.7;
  }
`;
const CommentContainer = styled.div`
  flex: 6 0 0;
  //border: solid greenyellow 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #001335;
  height: 500px;
  width: 100%;
`;
const CommentListContainer = styled.div`
  border: 1px solid white;
  width: 100%;
  height: 100%;
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
  flex: 2 0 0;
  //border: solid greenyellow 2px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 1rem;
  border-bottom: solid 3px white;
`;
const NFTDate = styled.div`
  border-bottom: solid 1px white;
`
const NFTUserInputData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const NamePriceContainer = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
  justify-content: space-between;
  h2 {
    margin-right: 10rem;
  }
`
const DescriptionContainer = styled.div`
  margin-top: 0.5rem;
  flex: 2 0 0;
`
const MultiAuctionRltContainer = styled.div`
  flex: 1 0 0;
  //border: solid brown 2px;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  padding-bottom: 1rem;
  border-bottom: solid 3px white;
`;
const RemainingContainer = styled.div`
  flex: 1 0 0;
  border-right: solid 1.5px white;
`;
const RltTitle = styled.div`
  padding-left: 1rem;
`
const RemainingPrice = styled.div`
  padding-left: 1rem;
  font-size: 2rem;
  font-weight: 200;
`;
const MaxBidder = styled.div`
  flex: 1 0 0;
  border-left: solid 1.5px white;
`;
const MaxBiddingPrice = styled.div`
  padding-left: 1rem;
  font-size: 2rem;
  font-weight: 200;
`;
const BiddingContainer = styled.div`
  flex: 1 0 0;
  //border: solid yellow 2px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 1rem;
  border-bottom: solid 1px white;
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
const BiddingOwnerSituation = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
// ListItemSellButton
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
/* (Start)List Part */
/* (Start)List Part-Header */
// List 전체를 담는 공간
const BidListContainer = styled.div`
  flex: 6 0 0;
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
  height: 3.5rem;
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
/* (End)List Part-Items */
/* (End)List Part */
/* (End)RightSide */

function MultiAuction() {
  let navigate = useNavigate();
  // user: accessToken, coin, id, master, userAddress
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  console.log("test-user", user)
  // id: tokenId 
  const id = useStore((state) => state.id);
  console.log("test-id", id)
  // clickedItem: clicked-nft Info(created_at, description, id, imgURI, name, price, tokenId, tokenURI, user=tokenOwnerAddress)
  const clickedItem = useClickedItem((state) => state.clickedItem);
  console.log("test-clickedItem", clickedItem)
  // clickedItemGroupList: multiauctiondatas findAll
  const clickedItemGroupList = useClickedItemGroupList(
    (state) => state.clickedItemGroupList
  );
  console.log("test-clickedItemGroupList", clickedItemGroupList)
  // Axios.get(`${url}/auction/multiclick`);
  // MultiAuctionData(MultiAuction 참가 정보-모든 토큰에 대해서)내 데이터를 clickedItemGroupList에 업데이트
  const { fetchClickedItemGroup } = useClickedItemGroupList();
  // clickedItemGroupList(MultiAuction 참가 정보-모든 토큰에 대해서)에서
  // 현NFT토큰 정보만 필터링 = clickFetchGroupList
  const clickFetchGroupList = clickedItemGroupList.filter(
    (data) => data.tokenId === Number(id)
  );
  console.log('test-clickFetchGroupList', clickFetchGroupList);

  console.log("Remaining-Bid-test", clickFetchGroupList[0]?.multiAuctionAddressList);
  const TotalBidArray = clickFetchGroupList[0]?.multiAuctionAddressList?.map((el) => {
    return el.bidPrice;
  });
  console.log("TotalBidArray", TotalBidArray);
  const TotalBid = TotalBidArray?.reduce(
    (prev, current) => {
      console.log("current", current);
      console.log("prev", prev);
      return (prev + current);
    }, 0
  );
  console.log("TotalBid", TotalBid);

  const max = clickFetchGroupList[0]?.multiAuctionAddressList?.reduce(function (
    prev,
    current
  ) {
    return prev?.bidPrice > current?.bidPrice ? prev : current;
  }); //returns object
  const maxBidAddress =
    max?.multiAuctionAddress?.slice(0, 6) +
    '...' +
    max?.multiAuctionAddress?.slice(-5);

  // bitState, 이미 bit 했는지 확인하기
  const bidState = useBidState((state) => state.bidState);
  // Axios.post(`${url}/auction/:id/AlreadyBid`, {metadata,});
  // MultiAuctionData내 tokenId에 현재 로그인 계정 있는지
  const { fetchBidState } = useBidState();
  // bid한 적이 없으면 빈배열, 있으면, 객체(bidPrice, multiAuctionAddress, created_at, _id)를 담은 배열 리턴
  //console.log('test-bidState', bidState);
  //console.log('test-bidState-length', bidState.length);
  //console.log('test-bidState-isArray', Array.isArray(bidState));

  /*
    ToDoList
    1. 판매 버튼 모달 처리
    XX2. 본인 계정에 대해서 수정 취소 나오게
    3. 수정시 디비 업데이트
    4. 취소시 디비 삭제
    5. 소유한 코인 이상 참가금액 참여 불가
    6. Remaining Bid 이상 참여 못함.
    7. Guest 모드
  */

  // modal
  const [checkBidToModal, setCheckBidToModal] = useState(true);
  const [checkSellModal, setCheckSellModal] = useState(true);
  const [checkUpdateModal, setCheckUpdateModal] = useState(true);
  const [modalSubmitData, setModalSubmitData] = useModalSubmitData((state) => [
    state.modalSubmitData,
    state.setModalSubmitData,
  ]);
  const [modalUpdateData, setModalUpdateData] = useModalUpdateData((state) => [
    state.modalUpdateData,
    state.setModalUpdateData,
  ]);
  
  const onUpdateModal = () => {
    setCheckUpdateModal((prev) => !prev);
  };

  const onClickUpdate = (e) => {
    onUpdateModal();
    console.log("onClickUpdate", e);
    const metadata = {
      tokenId: id,
      tokenOwnerAddress: clickFetchGroupList[0].tokenOwnerAddress,
      bidAddress: e.multiAuctionAddress,
      bidPrice: e.bidPrice,
    };
    console.log("onClickUpdate-metadata_test", metadata);
    setModalUpdateData(metadata);
    console.log("modalUpdateData", modalUpdateData);
    setCheckUpdateModal(false);
  }








  //??
  const [clickedBidList, setClickedBidList] = useState();

  const [bidMessage, setBidMessage] = useState();



  // modal
  //const [checkBidToModal, setCheckBidToModal] = useState(true);
  //const [checkSellModal, setCheckSellModal] = useState(true);
  //const [modalSubmitData, setModalSubmitData] = useModalSubmitData((state) => [
  //  state.modalSubmitData,
  //  state.setModalSubmitData,
  //]);
  const onClickModal = (e) => {
    console.log(e);
    setCheckBidToModal((prev) => !prev);
  };

  const onSellModal = () => {
    setCheckSellModal((prev) => !prev);
  };
  // modal


























  const onChangeBid = (e) => {
    console.log(e.target.value);
    setBid(e.target.value);
  };

  useEffect(() => {
    fetchClickedItemGroup();
    const currentAddress = window.web3.currentProvider.selectedAddress;
    const metadata = {
      tokenId: id,
      currentAddress: currentAddress,
    };
    fetchBidState(metadata);
  }, []);

  const [bid, setBid] = useState();
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
    // window.location.assign('http://localhost:3000');

    setBid('');
  };

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

  return (
    <TotalPage>
      {!checkBidToModal ? (
        <ModalComponent bidMessage={bidMessage} onClickModal={onClickModal} />
      ) : !checkSellModal ? (
        <ModalSubmit onSellModal={onSellModal} />
      ) : !checkUpdateModal ? (
        <ModalUpdate onUpdateModal={onUpdateModal}/>) : null}
      <PageTitle>MultiAuction</PageTitle>
      <MultiAuctionPage>
        <PreViewNFT>
          <PreViewNFTImg>
            <img src={clickedItem?.imgURI} alt="preview-img" />
          </PreViewNFTImg>
          <PreViewNFTInfo>
            <a href={clickedItem?.imgURI} target="_blank" rel="noreferrer">
              <i className="fas fa-layer-group"></i>
              ipfs
            </a>
            <a href={clickedItem?.tokenURI} target="_blank" rel="noreferrer">
              <i className="fas fa-server"></i>
              metadata
            </a>
          </PreViewNFTInfo>
          <CommentContainer>
            <CommentListContainer>
              <h1>Hi</h1>
              <Comment />
            </CommentListContainer>
          </CommentContainer>
        </PreViewNFT>
        <MultiAuctionInfo>
          <NFTInfo>
            <NFTDate>
              <span>상품등록 시간: </span>
              <span>{clickedItem?.created_at}</span>
              <span> | 현재 로그인 계정: {user.userAddress}</span>
            </NFTDate>
            <NFTUserInputData>
              <NamePriceContainer>
                <h2>Name: {clickedItem?.name}</h2>
                <h2><i className="fab fa-btc"></i> {clickedItem?.price}</h2>
              </NamePriceContainer>
              <DescriptionContainer>
                <h3>Description: {clickedItem?.description}</h3>
              </DescriptionContainer>
            </NFTUserInputData>
          </NFTInfo>
          <MultiAuctionRltContainer>
            <RemainingContainer>
              {true ? <RltTitle>Remaining Bid</RltTitle> : <RltTitle>Current bid</RltTitle>}
              <RemainingPrice>
                <h3><i className="fab fa-btc"></i>
                  {clickedItem?.price - TotalBid}</h3>
              </RemainingPrice>
            </RemainingContainer>
            <MaxBidder>
              {true ? <RltTitle>MaxBidder</RltTitle> : <RltTitle>Ends in</RltTitle>}
              {true ? (
                <MaxBiddingPrice>
                  <h3>{max?.multiAuctionAddress
                    ? maxBidAddress
                    : '참여자가 없습니다.'}</h3>
                </MaxBiddingPrice>
              ) : (
                <MaxBiddingPrice>2h 21m 50s</MaxBiddingPrice>
              )}
            </MaxBidder>
          </MultiAuctionRltContainer>
          {clickedItem.user !== user.userAddress ? (
            <BiddingContainer>
              {bidState.length === 0 ?
                (<label>원하는 가격을 입력하세요!</label>) :
                (<label>이미 참가한 상태입니다!</label>)}
              {bidState.length === 0 ?
                (<BiddingInput>
                  <input
                    type="text"
                    placeholder="ETH"
                    value={bid}
                    onChange={(e) => onChangeBid(e)}
                  ></input>
                  <button onClick={onClickMultiBidding}>Bid</button>
                </BiddingInput>) : <></>}
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
                  {el?.multiAuctionAddress === user.userAddress ? (
                    <BidButtonContainer>
                      <BidItemUpdateButton onClick={() => onClickUpdate(el)}>
                        수정
                      </BidItemUpdateButton>
                      <BidItemDeleteButton>취소</BidItemDeleteButton>
                    </BidButtonContainer>
                  ) : (
                    <BidButtonContainer>
                    </BidButtonContainer>
                  )}
                </BidListItemContainer>
              );
            })}
          </BidListContainer>
        </MultiAuctionInfo>
      </MultiAuctionPage>
    </TotalPage >
  );
}

export default MultiAuction;
