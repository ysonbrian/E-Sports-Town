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
import ModalOwner from '../components/ModalOwner';
import ModalVote from '../components/ModalVote';
import Comment from '../components/Comment';
import auct from '../images/auct.jpeg';
import { GiVote } from 'react-icons/gi';

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
  justify-content: space-around;
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
  gap: 30px;
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
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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
  flex: 4 0 0;
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
  padding-left: 20px;
`;
const BidHeaderThree = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 50px;
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
  padding-right: 20px;
`;

function Vote({ clickedItemList }) {
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  const id = useStore((state) => state.id);
  const clickedItem = useClickedItem((state) => state.clickedItem);
  const [checkOwnerModal, setCheckOwnerModal] = useState(true);

  const { fetchClickedItem } = useClickedItemBidList();
  // const comments
  const comments = useComments((state) => state.comments);
  const { fetchComments } = useComments();
  const [auctionComments, setAuctionComments] = useState([]);

  const [bid, setBid] = useState();
  const [bidMessage, setBidMessage] = useState();

  // comment
  // const [comments, setComments] = useComments((state) => [
  //   state.comments,
  //   state.setComments,
  // ]);

  // modal
  const [checkVoteModal, setCheckVoteModal] = useState(true);
  const [modalSubmitData, setModalSubmitData] = useModalSubmitData((state) => [
    state.modalSubmitData,
    state.setModalSubmitData,
  ]);

  const { fetchOwnerData } = useModalOwnerData();

  // modal
  // const onClickModal = (e) => {
  //   console.log(e);
  //   setCheckBidToModal((prev) => !prev);
  // };
  const clickFetchList = clickedItemList.filter(
    (data) => data.tokenId === Number(id)
  );
  const max = clickFetchList[0]?.biddingList?.reduce(function (prev, current) {
    return prev?.bidPrice > current?.bidPrice ? prev : current;
  }); //returns object

  const maxBidAddress =
    max?.bidAddress?.slice(0, 6) + '...' + max?.bidAddress?.slice(-5);

  const onChangeBid = (e) => {
    setBid(e.target.value);
  };

  const onClickToVote = (e) => {
    setCheckVoteModal(false);
    const metadata = {
      tokenId: id,
      tokenOwnerAddress: clickedItem.user,
      tokenPrice: clickedItem.price,
      voteAddress: e.multiAuctionAddress,
      voterPrice: e.bidPrice,
      type: 'multi',
    };
    console.log('nana', metadata);
    setModalSubmitData(metadata);
  };
  const totalVoted = clickedItem?.multiAuctionAddressList?.reduce(
    (acc, cur) => {
      if (cur.isVoted === true) {
        return (acc += 1);
      }
      return (acc += 0);
    },
    0
  );

  const onClickComments = (data) => {
    // console.log(data);
    setAuctionComments([data, ...auctionComments]);
  };
  const onClickOwner = async () => {
    onOwnerModal();
  };
  const onOwnerModal = () => {
    setCheckOwnerModal((prev) => !prev);
  };

  useEffect(() => {
    fetchClickedItem();
    fetchComments(id);
    const metadata = {
      tokenId: id,
    };
    fetchOwnerData(metadata);
  }, []);

  return (
    <TotalPage>
      {!checkVoteModal ? (
        <ModalVote setCheckVoteModal={setCheckVoteModal} />
      ) : !checkOwnerModal ? (
        <ModalOwner onOwnerModal={onOwnerModal} />
      ) : null}
      {/* <ModalComponent onClickModal={onClickModal} /> */}
      <PageTitle>Vote</PageTitle>
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
              <WinnerTitle>투표 진행 상황</WinnerTitle>
              <WinningCurrent_Price>
                <h3>
                  <GiVote />
                  판매 허가 투표 진행중
                </h3>
              </WinningCurrent_Price>
            </WinningCurrent>
            <WinnerEnd>
              <WinnerTitle>총 투표 인원</WinnerTitle>
              <WinningCurrent_Price>
                <h3>{totalVoted + '명'}</h3>
              </WinningCurrent_Price>
            </WinnerEnd>
          </BidRltContainer>

          <BidListContainer>
            <BidListHeaderContainer>
              <BidHeaderOne>투표 유저</BidHeaderOne>
              <BidHeaderTwo>비드 금액</BidHeaderTwo>
              <BidHeaderThree>비고</BidHeaderThree>
            </BidListHeaderContainer>
            {clickedItem?.multiAuctionAddressList?.map((el) => {
              const newUserAddress =
                el?.multiAuctionAddress?.slice(0, 6) +
                '...' +
                el?.multiAuctionAddress?.slice(-5);
              return (
                <BidListItemContainer key={el?._id}>
                  <BidItemName>{newUserAddress}</BidItemName>
                  <BidItemPrice>{el?.bidPrice}</BidItemPrice>
                  {el?.isVoted === false &&
                  user.userAddress === el?.multiAuctionAddress ? (
                    <BidItemSellButton onClick={() => onClickToVote(el)}>
                      투표
                    </BidItemSellButton>
                  ) : el?.isVoted === true &&
                    user.userAddress === el?.multiAuctionAddress ? (
                    <BidItemlabel>투표 완료</BidItemlabel>
                  ) : (
                    <BidItemlabel>투표 미완료</BidItemlabel>
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

export default Vote;
