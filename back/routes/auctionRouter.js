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
    console.log("multiclick")
    if (data) {
      console.log(data)
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
    console.log("MultiAuction", MultiAuction)
    if (MultiAuction.length === 0) {
      const newMultiAuctionData = new MultiAuctionData({
        tokenId: tokenId,
        tokenOwnerAddress: tokenOwnerAddress,
        multiAuctionAddressList: [{ multiAuctionAddress: currentAddress, bidPrice: bid }],
      });
      await newMultiAuctionData.save();
    } else {
      console.log("MultiAuction.length Not 0")

      //const MultiAuction = await MultiAuctionData.findOneAndUpdate({ tokenId: tokenId });
      const update = await MultiAuctionData.findOneAndUpdate({ tokenId: tokenId },
        { $push: { multiAuctionAddressList: [{ multiAuctionAddress: currentAddress, bidPrice: bid }] } });
      console.log("update", update)
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/AlreadyBid', async (req, res) => {
  const { tokenId, currentAddress } = req.body.metadata;
  try {
    console.log("AlreadyBid-tokenId", tokenId)
    console.log("AlreadyBid-currentAddress", currentAddress)
    //const AlrdyBid = await MultiAuctionData
  } catch (error) {
    console.log(error);
  }
});


/*router.put('/:id/AddJoinerGrouping', async (req, res) => {
  const { GroupInfo, currentAddress } = req.body.metadata;
  console.log("GroupInfo :" + GroupInfo)
  console.log("currentAddress :" + currentAddress)
  const id = GroupInfo._id;
  console.log("id", id)
  try {
    //const search =
    //  await multiAuctionData.findOne({id: id}, (err, docs) => {
    //    if(err) console.log(err);
    //    else console.log("Result : ", docs)
    //  });
    //console.log("search",search);
    const update =
      await multiAuctionData.findByIdAndUpdate(
        id,
        { $push: { GroupAddressList: [{ GroupAddress: currentAddress }] } });
    //console.log("update",update)
  } catch (err) {
    console.log(err)
  }
});*/



router.post('/:id/sell', async (req, res) => {
  console.log(req.body);
  setToken(req, res);
  setTimeout(() => {
    sellNft(req, res, req.body.metadata);
  }, 3000);
  // try {

  // } catch (error) {
  //   console.log(error);
  // }
});

module.exports = router;
