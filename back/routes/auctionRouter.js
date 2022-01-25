const express = require('express');
const router = express.Router();
const { sellNft, setToken, setBidding } = require('../controllers/Mint.js');

const auctionData = require('../models/AuctionData');
const Users = require('../models/Users');
const MultiAuctionData = require('../models/MultiAuctionData');

router.get('/click', async (req, res) => {
  try {
    const data = await auctionData.find();
    if (data) {
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
    console.log('multiclick');
    if (data) {
      //console.log(data);
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
    //const user = await Users.find({ userAddress: currentAddress });
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
    const AlrdyBid = await MultiAuctionData.find(
      {
        $and:
          [
            { tokenId: tokenId },
            //{ multiAuctionAddressList: [ { bidPrice: { $lt: 15} } ] }
            //{ multiAuctionAddressList: [{ multiAuctionAddress: currentAddress }] }
          ]
      }
    );
    //console.log('AlrdyBid', AlrdyBid[0]?.multiAuctionAddressList);
    const AlrdyBidRlt = AlrdyBid[0]?.multiAuctionAddressList?.filter((el) => {
      return (el.multiAuctionAddress === currentAddress);
    })
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
  console.log(req.body);
  setToken(req, res);
  setTimeout(() => {
    sellNft(req, res, req.body.metadata);
  }, 3000);
  setTimeout(() => {
    setApproveForAll(req, res, req.body.metadata);
  }, 3000);
  // try {

  // } catch (error) {
  //   console.log(error);
  // }
});

module.exports = router;
