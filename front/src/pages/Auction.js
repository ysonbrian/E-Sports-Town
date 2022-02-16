import React, { useState, useEffect } from 'react';
import {
  useStore,
  useClickedItem,
  useSign,
  useClickedItemBidList,
  useComments,
  useModalOwnerData,
} from '../utils/store';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { submitBid, getClickedItemBidList, submitSell } from '../utils/data';
import { useModalSubmitData } from '../utils/store';
import ModalComponent from '../components/Modal';
import ModalSubmit from '../components/ModalSubmit';
import ModalOwner from '../components/ModalOwner';
import Comment from '../components/Comment';
import auct from '../images/auct.jpeg';

const TotalPage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: white;
  background-image: url(${auct});
  background-size: 100% 100%;
`;
const PageTitle = styled.h1`
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
/* (Start)LeftSide */
const ImgNFT = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  height: 800px;
  align-items: center;
`;
const NftPreviewImg = styled.div`
  flex: 4 0 0;
  width: 300px;
  height: 300px;
  img {
    width: 295px;
    height: 295px;
  }
`;
const ImgDescription = styled.div`
  flex: 1 0 0;
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
  flex: 10 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #000000;
  height: 500px;
  width: 100%;
`;
const CommentListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: scroll;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CommentsItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border: 1px solid;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-weight: 600;
`;

const CommentsItemAccount = styled.div`
  font-weight: 800;
`;

const CommentsItemComment = styled.div``;
const CommentsItemDate = styled.div`
  color: #d7d7d7;
`;
/* (End)LeftSide */

/* (Start)RightSide */
const ProfileNFT = styled.div`
  flex: 2 0 0;
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;
const InfoNFT = styled.div`
  flex: 2 0 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 1rem;
  border-bottom: solid 3px white;
`;
const CreatedInfo = styled.div`
  border-bottom: solid 1px white;
`;
const NameIPFSMetadata = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const NamePriceContainerNFT = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
  justify-content: space-between;
  h2 {
    margin-right: 10rem;
  }
`;
const DescriptionContainerNFT = styled.div`
  margin-top: 0.5rem;
  flex: 2 0 0;
`;
const BidRltContainer = styled.div`
  flex: 1 0 0;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  padding-bottom: 1rem;
  border-bottom: solid 3px white;
`;
const WinningCurrent = styled.div`
  flex: 1 0 0;
  border-right: solid 1.5px white;
`;
const WinnerTitle = styled.div`
  padding-left: 1rem;
`;
const WinningCurrent_Price = styled.div`
  padding-left: 1rem;
  font-size: 2rem;
  font-weight: 200;
`;
const WinnerEnd = styled.div`
  flex: 1 0 0;
  border-left: solid 1.5px white;
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
  justify-content: space-between;
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
  flex: 6 0 0;
  display: flex;
  flex-direction: column;
  border: solid 2px gainsboro;
  overflow: auto;
`;
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
  padding-left: 20px;
`;
const BidHeaderTwo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 70px;
`;
const BidHeaderThree = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 40px;
`;
const BidHeaderFour = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
`;
const BidListItemContainer = styled.div`
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: #323232;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 3.5rem;
`;
const BidItemName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BidItemCreated = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BidItemPrice = styled.div`
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
const BidItemlabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: none;
  font-weight: bold;
  letter-spacing: 2px;
`;

function Auction({ clickedItemList }) {
  let navigate = useNavigate();
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  const id = useStore((state) => state.id);
  const clickedItem = useClickedItem((state) => state.clickedItem);
  const [sign, setSign] = useSign((state) => [state.sign, state.setSign]);

  const { fetchClickedItem } = useClickedItemBidList();
  // const comments
  const comments = useComments((state) => state.comments);
  const { fetchComments } = useComments();
  const [auctionComments, setAuctionComments] = useState([]);

  const [clickedBidList, setClickedBidList] = useState();
  const [bid, setBid] = useState();
  const [bidMessage, setBidMessage] = useState();

  // comment
  // const [comments, setComments] = useComments((state) => [
  //   state.comments,
  //   state.setComments,
  // ]);

  // modal
  const [checkOwnerModal, setCheckOwnerModal] = useState(true);
  const [checkBidToModal, setCheckBidToModal] = useState(true);
  const [checkSellModal, setCheckSellModal] = useState(true);
  const [modalSubmitData, setModalSubmitData] = useModalSubmitData((state) => [
    state.modalSubmitData,
    state.setModalSubmitData,
  ]);
  const { fetchOwnerData } = useModalOwnerData();
  const onOwnerModal = () => {
    setCheckOwnerModal((prev) => !prev);
  };
  const onClickModal = (e) => {
    console.log(e);
    setCheckBidToModal((prev) => !prev);
  };

  const onSellModal = () => {
    setCheckSellModal((prev) => !prev);
  };
  // modal
  const onClickOwner = async () => {
    onOwnerModal();
  };

  const clickFetchList = clickedItemList.filter(
    (data) => data.tokenId === Number(id)
  );
  console.log('clickFetchList-test', clickFetchList);
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
      bid: bid,
      signature: sign,
    };
    const submitData = await submitBid(metadata);
    const transactionParameters = {
      nonce: '0x00', // ignored by MetaMask
      gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
      gas: '0x2710', // customizable by user during MetaMask confirmation.
      to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      value: '0x00', // Only required to send ether to the recipient from the initiating external account.
      data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
      chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };

    // txHash is a hex string
    // As with any RPC call, it may throw an error
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    // if (
    //   submitData.message === 'lowerThanMax' ||
    //   submitData.message === 'NoMoney'
    // ) {
    //   console.log('after submitData.message!!', submitData.message);
    //   setBidMessage(submitData.message);
    //   setCheckBidToModal(false);
    // } else {
    //   console.log('AFTER submitData.message!!', submitData.message);
    //   setBidMessage(submitData.message);
    //   setCheckBidToModal(true);
    //   // navigate('/');
    //   window.location.assign('http://localhost:3000');
    //   // window.location.reload(false);
    // }
    setBid('');
  };

  const onChangeBid = (e) => {
    setBid(e.target.value);
  };

  const onClickToSell = (e) => {
    onSellModal();
    // console.log(clickFetchList);
    const metadata = {
      tokenId: id,
      tokenOwnerAddress: clickFetchList[0].tokenOwnerAddress,
      bidAddress: e.bidAddress,
      bidPrice: e.bidPrice,
      price: clickedItem.price,
      type: 'normal',
    };
    console.log('onClickToSell-normal-metadata', metadata);
    setModalSubmitData(metadata);
  };

  console.log('clicked!', clickedItem.user, 'user!', user.userAddress);

  const onClickComments = (data) => {
    // console.log(data);
    setAuctionComments([data, ...auctionComments]);
    console.log('auction!', auctionComments);
  };

  useEffect(() => {
    fetchClickedItem();
    fetchComments(id);
    const metadata = {
      tokenId: id,
    };
    fetchOwnerData(metadata);
  }, []);
  console.log('AHAHAHH', comments);
  return (
    <TotalPage>
      {!checkBidToModal ? (
        <ModalComponent bidMessage={bidMessage} onClickModal={onClickModal} />
      ) : !checkSellModal ? (
        <ModalSubmit onSellModal={onSellModal} />
      ) : !checkOwnerModal ? (
        <ModalOwner onOwnerModal={onOwnerModal} />
      ) : (
        !null
      )}
      {/* <ModalComponent onClickModal={onClickModal} /> */}
      <PageTitle>Auction</PageTitle>
      <AuctionNFT>
        <ImgNFT>
          <NftPreviewImg>
            <img src={clickedItem?.imgURI} alt="preview-img" />
          </NftPreviewImg>
          <ImgDescription>
            {/*<h2>{clickedItem?.description}</h2>*/}
            <a href={clickedItem?.imgURI} target="_blank" rel="noreferrer">
              <i className="fas fa-layer-group"></i>
              ipfs
            </a>
            <a href={clickedItem?.tokenURI} target="_blank" rel="noreferrer">
              <i className="fas fa-server"></i>
              metadata
            </a>
          </ImgDescription>
          <CommentContainer>
            <CommentListContainer>
              {comments?.data
                ? comments?.data?.map((data, index) => {
                    const newUserAddress =
                      data.userAddress.slice(0, 6) +
                      '...' +
                      data.userAddress.slice(-5);
                    const date = data.created_at.split('T');
                    let rDate = null;
                    if (date) {
                      const newDate = date[0]?.split('-');
                      const newtime = date[1]?.split('.');
                      const newtime2 = newtime[0]?.split(':');
                      const result = [...newDate, ...newtime2];
                      const result1 = result.slice(0, 3).join('-');
                      rDate = result1;
                    }
                    return (
                      <CommentsItemContainer key={index}>
                        <CommentsItemAccount>
                          {newUserAddress}
                        </CommentsItemAccount>
                        <CommentsItemComment>
                          {data.comment}
                        </CommentsItemComment>
                        <CommentsItemDate>{rDate}</CommentsItemDate>
                      </CommentsItemContainer>
                    );
                  })
                : auctionComments?.map((data, index) => (
                    <CommentsItemContainer key={index}>
                      <div>{data.userAddress}</div>
                      <div>{data.comment}</div>
                    </CommentsItemContainer>
                  ))}
            </CommentListContainer>
            <Comment id={id} onClickComments={onClickComments} />
          </CommentContainer>
        </ImgNFT>
        <ProfileNFT>
          <InfoNFT>
            <CreatedInfo>
              <span>상품등록 시간: </span>
              <span>{clickedItem?.created_at}</span>
            </CreatedInfo>
            <NameIPFSMetadata>
              <NamePriceContainerNFT>
                <h2>Name: {clickedItem?.name}</h2>
                <h2>
                  <i className="fab fa-btc"></i> {clickedItem?.price}
                </h2>
                <h2 onClick={onClickOwner}>소유자 보기</h2>
              </NamePriceContainerNFT>
              <DescriptionContainerNFT>
                <h3>Description: {clickedItem?.description}</h3>
              </DescriptionContainerNFT>
            </NameIPFSMetadata>
          </InfoNFT>
          <BidRltContainer>
            <WinningCurrent>
              {true ? (
                <WinnerTitle>현재 최고가</WinnerTitle>
              ) : (
                <WinnerTitle>Current bid</WinnerTitle>
              )}
              <WinningCurrent_Price>
                <h3>
                  <i className="fas fa-bars"></i>
                  {max?.bidPrice ? max?.bidPrice : '제시 금액이 없습니다.'}
                </h3>
              </WinningCurrent_Price>
            </WinningCurrent>
            <WinnerEnd>
              {true ? (
                <WinnerTitle>최고가 제시 유저</WinnerTitle>
              ) : (
                <WinnerTitle>Ends in</WinnerTitle>
              )}
              {true ? (
                <WinningCurrent_Price>
                  <h3>
                    {max?.bidAddress
                      ? maxBidAddress
                      : '최고가를 기록 해보세요!'}
                  </h3>
                </WinningCurrent_Price>
              ) : (
                <WinningCurrent_Price>2h 21m 50s</WinningCurrent_Price>
              )}
            </WinnerEnd>
          </BidRltContainer>
          {clickedItem.user !== user.userAddress ? (
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
            <BiddingContainer>본인의 NFT 입니다.</BiddingContainer>
          )}
          <BidListContainer>
            <BidListHeaderContainer>
              <BidHeaderOne>비드 유저</BidHeaderOne>
              <BidHeaderTwo>비드 날짜</BidHeaderTwo>
              <BidHeaderThree>비드 금액</BidHeaderThree>
              <BidHeaderFour>비고</BidHeaderFour>
            </BidListHeaderContainer>
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
                  ) : (
                    <BidItemlabel>입찰 완료</BidItemlabel>
                  )}
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
