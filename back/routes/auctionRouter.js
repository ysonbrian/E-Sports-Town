const express = require('express');
const router = express.Router();
const {
  sellNft,
  setToken,
  setBidding,
  sellMultiNft,
  setMultiBidding,
  setApproveForAll,
} = require('../controllers/Mint.js');

const auctionData = require('../models/AuctionData');
const normalData = require('../models/NormalData');
const Users = require('../models/Users');
const MultiAuctionData = require('../models/MultiAuctionData');

router.get('/click', async (req, res) => {
  try {
    const data = await auctionData.find();
    //const data = await normalData.find();
    if (data) {
      console.log('click-find', data);
      res.json(data);
    } else {
      console.log('No data!');
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/bidding', async (req, res) => {
  const { currentAddress, tokenId, bid } = req.body.metadata;
  try {
    const user = await Users.find({ userAddress: currentAddress });
    const auction = await auctionData.find({ tokenId: tokenId });
    if (auction.length === 0) {
      setBidding(req, res, req.body.metadata);
    } else if (auction[0]?.biddingList?.length === 1) {
      let max = auction[0]?.biddingList[0].bidPrice;
      if (max >= Number(bid)) {
        return res.send({ message: 'lowerThanMax' });
      } else {
        setBidding(req, res, req.body.metadata);
      }
    } else if (user[0]?.token >= Number(bid)) {
      let max = auction[0]?.biddingList?.reduce((acc, val) => {
        return acc > val.bidPrice ? acc : val.bidPrice;
      });
      if (max < Number(bid)) {
        setBidding(req, res, req.body.metadata);
      } else {
        return res.send({ message: 'lowerThanMax' });
      }
    } else {
      return res.send({ message: 'NoMoney' });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/multiclick', async (req, res) => {
  try {
    const data = await MultiAuctionData.find();
    //const data = await normalData.find();
    console.log('multiclick');
    if (data) {
      console.log('multiclick-find', data);
      res.json(data);
    } else {
      console.log('No data!');
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/MultiBidding', async (req, res) => {
  const { tokenId, tokenOwnerAddress, bid, currentAddress } = req.body.metadata;
  try {
    setMultiBidding(req, res, req.body.metadata);
    const user = await Users.find({ userAddress: currentAddress });
    const MultiAuction = await MultiAuctionData.find({ tokenId: tokenId });
    //console.log('MultiAuction', MultiAuction);
    if (MultiAuction.length === 0) {
      const newMultiAuctionData = new MultiAuctionData({
        tokenId: tokenId,
        tokenOwnerAddress: tokenOwnerAddress,
        multiAuctionAddressList: [
          { multiAuctionAddress: currentAddress, bidPrice: bid },
        ],
      });
      await newMultiAuctionData.save();
    } else {
      console.log('MultiAuction.length Not 0');
      //const MultiAuction = await MultiAuctionData.findOneAndUpdate({ tokenId: tokenId });
      const update = await MultiAuctionData.findOneAndUpdate(
        { tokenId: tokenId },
        {
          $push: {
            multiAuctionAddressList: [
              { multiAuctionAddress: currentAddress, bidPrice: bid },
            ],
          },
        }
      );
      console.log('update', update);
    }
    res.send('success');
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/AlreadyBid', async (req, res) => {
  const { tokenId, currentAddress } = req.body.metadata;
  try {
    console.log('AlreadyBid-tokenId', tokenId);
    console.log('AlreadyBid-currentAddress', currentAddress);
    //{ $and: [ { "writer": "Velopert" }, { "likes": { $lt: 10 } } ] }
    //const AlrdyBid = await MultiAuctionData.find(
    //  { tokenId: tokenId },
    //  //{ multiAuctionAddressList: [{ multiAuctionAddress: currentAddress }] }
    //);
    const AlrdyBid = await MultiAuctionData.find({
      $and: [
        { tokenId: tokenId },
        //{ multiAuctionAddressList: [ { bidPrice: { $lt: 15} } ] }
        //{ multiAuctionAddressList: [{ multiAuctionAddress: currentAddress }] }
      ],
    });
    //console.log('AlrdyBid', AlrdyBid[0]?.multiAuctionAddressList);
    const AlrdyBidRlt = AlrdyBid[0]?.multiAuctionAddressList?.filter((el) => {
      return el.multiAuctionAddress === currentAddress;
    });
    console.log('AlrdyBidRlt', AlrdyBidRlt);
    //const AlrdyBidRltFinal;
    //if(Array.isArray(AlrdyBidRlt) && AlrdyBidRlt.length === 0) {
    //}
    res.send(AlrdyBidRlt);
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/sell', async (req, res) => {
  // 멀티시그에서 받아오는 정보를 type으로 구분해서 setMultiContract를 설정해야함
  // 현재 밑은 단일 판매용도로만 진행됨
  const data = await normalData.findOne({ tokenId: req.body.metadata.tokenId });
  setToken(req, res);
  if (req.body.metadata.type === 'multi') {
    // 다중 비드와 다중 지분
    console.log('다중비드 시작!');
    const { tokenId, tokenOwnerAddress, bidAddressNPrice, type, price } =
      req.body.metadata;
    let maxOwnerAddress;
    let maxOwnerBidPrice = { bidPrice: 0 };
    let maxOwnerPrice = 0;
    // max값 빼내는 용도
    let tempbidAddressNPrice = bidAddressNPrice;
    console.log(tempbidAddressNPrice);

    let mOwner = tempbidAddressNPrice
      .map((data) => data)
      .reduce((acc, cur) => {
        if (acc < cur.bidPrice) {
          console.log(cur.bidPrice);
          acc = cur.bidPrice;
          maxOwnerAddress = cur.multiAuctionAddress;
          maxOwnerPrice = cur.bidPrice;
          return acc;
        }
      }, 0);

    console.log('hahah', maxOwnerAddress);
    console.log(maxOwnerBidPrice);
    let multiAuctionList = tempbidAddressNPrice.map(
      (data) => data.multiAuctionAddress
    );
    let multiAuctionBidList = tempbidAddressNPrice.map((data) => data.bidPrice);
    const metadata = {
      tokenId: tokenId,
      tokenOwnerAddress: tokenOwnerAddress,
      bidAddressNPrice: bidAddressNPrice,
      type: type,
      price: price,
      multiAuctionList: multiAuctionList,
      multiAuctionBidList: multiAuctionBidList,
      maxOwnerAddress: maxOwnerAddress,
      maxOwnerPrice: maxOwnerPrice,
    };
    console.log(metadata);
    setTimeout(() => {
      sellMultiNft(req, res, metadata);
    }, 1000);
  } else {
    // 단일 비드리스트 입력받을 시
    console.log('단일비드 시작!');

    setTimeout(() => {
      sellNft(req, res, req.body.metadata);
    }, 1000);
  }
});

router.post('/:id/update', async (req, res) => {
  console.log('update-router', req.body.metadata);
  const { userbidInfo, updatedbid } = req.body.metadata;

  const tokenId = userbidInfo.tokenId;
  const tokenOwnerAddress = userbidInfo.tokenOwnerAddress;
  const bidAddress = userbidInfo.bidAddress;
  const bidPrice = userbidInfo.bidPrice;

  try {
    let updateFindOneRlt = await MultiAuctionData.findOne({ tokenId: tokenId });

    for (
      let i = 0;
      i < updateFindOneRlt?.multiAuctionAddressList?.length;
      i++
    ) {
      if (
        updateFindOneRlt?.multiAuctionAddressList[i]?.multiAuctionAddress ===
        bidAddress
      ) {
        //updateFindOneRlt?.multiAuctionAddressList[i][bidPrice] = parseInt(updatedbid);
        //console.log('multiAuctionAddress-for', updateFindOneRlt?.multiAuctionAddressList[i]?.multiAuctionAddress);
        updateFindOneRlt.multiAuctionAddressList[i].bidPrice = updatedbid;
      }
    }

    await updateFindOneRlt.save();
    res.send('success');
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/delete', async (req, res) => {
  console.log('delete-router', req.body.metadata);
  const { tokenId, tokenOwnerAddress, bidAddress, bidPrice } =
    req.body.metadata;

  console.log('delete-router-tokenId', tokenId);
  console.log('delete-router-tokenOwnerAddress', tokenOwnerAddress);
  console.log('delete-router-bidAddress', bidAddress);
  console.log('delete-router-bidPrice', bidPrice);
  try {
    // findOne save 형태는 데이터 갱신만 되는 걸로 보임, 지운 상태로 저장은 안됨.
    //const deleteRlt = await MultiAuctionData.findOne({ tokenId: tokenId });
    //console.log('deleteRlt', deleteRlt);
    //for (let i = 0; i < deleteRlt?.multiAuctionAddressList?.length; i++) {
    //  if (deleteRlt?.multiAuctionAddressList[i]?.multiAuctionAddress === bidAddress) {
    //    //updateFindOneRlt?.multiAuctionAddressList[i][bidPrice] = parseInt(updatedbid);
    //    //console.log('multiAuctionAddress-for', updateFindOneRlt?.multiAuctionAddressList[i]?.multiAuctionAddress);
    //    deleteRlt.multiAuctionAddressList.splice(i,1);
    //  }
    //}
    //console.log('after-deleteRlt', deleteRlt);
    //await deleteRlt.save();

    const deleteRlt = await MultiAuctionData.findOneAndUpdate(
      { tokenId: tokenId },
      {
        $pull: { multiAuctionAddressList: { multiAuctionAddress: bidAddress } },
      },
      { safe: true, multi: true }
    );

    res.send('success');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
