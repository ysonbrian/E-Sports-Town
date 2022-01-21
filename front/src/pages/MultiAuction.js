import React, { useState, useEffect } from 'react';
import {
  useStore,
  useClickedItem,
  useSign,
  useClickedItemBidList,
} from '../utils/store';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { submitBid, getClickedItemBidList, submitSell } from '../utils/data';
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
  width: 100px;
  height: 40px;
  border-radius: 6px;
  text-align: center;
  color: #f4f4f4;
  border: none;
  background-color: #fe7e6d;
  font-weight: bold;
  cursor: pointer;
  padding: 0px 1.25rem;
  margin-right: 10px;
  letter-spacing: 2px;
  :hover {
    opacity: 0.7;
  }
`;

const ImgDescription = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center
`;

const ImgDescriptionPrice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const BidListHeaderContainer = styled.div`
  margin: 0.5rem;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BidHeaderOne = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 30px;
`;
const BidHeaderTwo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 50px;
`;
const BidHeaderThree = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
`;
const BidHeaderFour = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 40px;
`;

function MultiAuction({ clickedItemList }) {
  console.log('NANAN', clickedItemList);
  let navigate = useNavigate();
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  const id = useStore((state) => state.id);
  const clickedItem = useClickedItem((state) => state.clickedItem);
  const [sign, setSign] = useSign((state) => [state.sign, state.setSign]);

  const { fetchClickedItem } = useClickedItemBidList();

  const [clickedBidList, setClickedBidList] = useState();
  // const [bid, setBid] = useState(); // Auction
  const [joiner, setJoiner] = useState();
  const [bidMessage, setBidMessage] = useState();

  // modal
  const [checkBidToModal, setCheckBidToModal] = useState(true);
  const [checkSellModal, setCheckSellModal] = useState(true);
  const onClickModal = (e) => {
    console.log(e);
    setCheckBidToModal((prev) => !prev);
  };

  const onSellModal = () => {
    setCheckSellModal((prev) => !prev);
  };
  // modal

  const clickFetchList = clickedItemList.filter(
    (data) => data.tokenId === Number(id)
  );
  const max = clickFetchList[0]?.biddingList?.reduce(function (prev, current) {
    return prev?.bidPrice > current?.bidPrice ? prev : current;
  }); //returns object

  const maxBidAddress =
    max?.bidAddress?.slice(0, 6) + '...' + max?.bidAddress?.slice(-5);

  const onClickBidding = async () => {
    const currentAddress = window.web3.currentProvider.selectedAddress;
    const metadata = {
      currentAddress: currentAddress,
      tokenId: id,
      tokenOwnerAddress: clickedItem.user,
      //bid: bid,
      joiner: joiner,
      
      signature: sign,
    };
    const submitData = await submitBid(metadata);

    /*if (
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
    }*/

    window.location.assign('http://localhost:3000');

    setJoiner('');
  };

  const onChangeBid = (e) => {
    console.log(e.target.value);
    setJoiner(e.target.value);
  };

  const onClickToSell = (e) => {
    onSellModal();
    console.log(e);
    submitSell();
  };

  console.log('clicked!', clickedItem.user, 'user!', user.userAddress);

  useEffect(() => {
    fetchClickedItem();
  }, []);

  return (
    <TotalPage>
      {!checkBidToModal ? (
        <ModalComponent bidMessage={bidMessage} onClickModal={onClickModal} />
      ) : !checkSellModal ? (
        <ModalSubmit onSellModal={onSellModal} />
      ) : null}
      {/* <ModalComponent onClickModal={onClickModal} /> */}
      <PageTitle>공동 구매</PageTitle>
      <AuctionNFT>
        <ImgNFT>
          <NftPreviewImg>
            <img src={clickedItem?.imgURI} alt="preview-img" />
          </NftPreviewImg>
          <ImgDescription>
            <div>
              <h2>{clickedItem?.description}</h2>
            </div>
            <ImgDescriptionPrice>
              <i className="fab fa-btc"></i>
              <h2>{clickedItem?.price}</h2>
            </ImgDescriptionPrice>
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
              {true ? <div>최대 모금 금액</div> : <div>Current bid</div>}
              <WinningCurrent_Price>
                <i className="fas fa-bars"></i>
                {max?.bidPrice ? max?.bidPrice : '모금된 금액이 없습니다.'}
              </WinningCurrent_Price>
            </WinningCurrent>
            <WinnerEnd>
              {true ? <div>최대 모금 그룹</div> : <div>Ends in</div>}
              {true ? (
                <WinningCurrent_Price>
                  {max?.bidAddress ? maxBidAddress : '공동구매 그룹을 만들어 주세요!'}
                </WinningCurrent_Price>
              ) : (
                <WinningCurrent_Price>2h 21m 50s</WinningCurrent_Price>
              )}
            </WinnerEnd>
          </BidRltContainer>
          {clickedItem.user !== user.userAddress ? (
            <BiddingContainer>
              <label>함께 구매를 원하는 인원을 설정하세요!</label>
              <BiddingInput>
                <input
                  type="text"
                  placeholder="참여인원"
                  value={joiner}
                  onChange={(e) => onChangeBid(e)}
                ></input>
                <button onClick={onClickBidding}>공동구매 그룹 생성</button>
              </BiddingInput>
            </BiddingContainer>
          ) : (
            <BiddingContainer>함께 구매를 원하는 인원을 설정하세요!</BiddingContainer>
          )}
          <BidListContainer>
            <BidListHeaderContainer>
              <BidHeaderOne>그룹 생성자</BidHeaderOne>
              <BidHeaderTwo>그룹 생성 날짜</BidHeaderTwo>
              <BidHeaderThree>1인당 참여 금액</BidHeaderThree>
              <BidHeaderFour>비고</BidHeaderFour>
            </BidListHeaderContainer>
            {/*clickFetchList[0]?.biddingList?.map((el) => {
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
                el?.bidAddress?.slice(0, 6) + '...' + el?.bidAddress?.slice(-5);

              return (
                <BidListItemContainer key={el?._id}>
                  <BidItemName>{newUserAddress}</BidItemName>
                  <BidItemCreated>{rDate}</BidItemCreated>
                  <BidItemPrice>{el?.bidPrice}</BidItemPrice>
                  {clickFetchList[0]?.tokenOwnerAddress === user.userAddress ? (
                    <BidItemSellButton onClick={() => onClickToSell(el)}>
                      판매
                    </BidItemSellButton>
                  ) : null}
                </BidListItemContainer>
              );
            })*/}
          </BidListContainer>
        </ProfileNFT>
      </AuctionNFT>
    </TotalPage>
  );
}

export default MultiAuction;
