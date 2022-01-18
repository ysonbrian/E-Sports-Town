const express = require('express');
const router = express.Router();
const { mintNft, sendToken, setBidding } = require('../controllers/Mint.js');
const auctionData = require('../models/AuctionData');
const Users = require('../models/Users');
router.get('/click', async (req, res) => {
  try {
    const data = await auctionData.find();
    console.log(data);
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
  // console.log(req.body.metadata);
  try {
    // const userToken = await Users.find({ userAddress: currentAddress });
    // console.log(userToken);
    // console.log(userToken[0].token >= Number(bid));
    // if (userToken.token >= Number(bid)) {
    //   console.log('ahaha');
    //   setBidding(req, res, req.body.metadata);
    //   res.send(true);
    // } else {
    //   res.send(false);
    // }
    const [user] = await Users.find({ userAddress: currentAddress });
    const [auction] = await auctionData.find({ tokenId: tokenId });

    if (user?.token >= Number(bid)) {
      if (auction?.length === 0) {
        setBidding(req, res, req.body.metadata);
      } else {
        let max = auction?.biddingList.reduce((acc, val) => {
          return acc > val.bidPrice ? acc : val.bidPrice;
        });
        if (max < Number(bid)) {
          setBidding(req, res, req.body.metadata);
        } else {
          return res.send({ message: 'lowerThanMax' });
        }
      }
    } else {
      return res.send({ message: 'NoMoney' });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
