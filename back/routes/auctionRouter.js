const express = require('express');
const router = express.Router();
const { mintNft, sendToken, setBidding } = require('../controllers/Mint.js');
const auctionData = require('../models/AuctionData');
const Users = require('../models/Users');
router.get('/click', async (req, res) => {
  console.log(req.body.id);
  try {
    const data = await auctionData.find();
    console.log(data);
    if (data) {
      console.log('Clicked Item is here!', data);
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
    console.log(user, auction);

    if (user?.token >= Number(bid)) {
      console.log('haha');
      if (auction?.length === 0) {
        setBidding(req, res, req.body.metadata);
      } else {
        let max = auction?.biddingList.reduce((acc, val) => {
          console.log(val.bidPrice);
          return acc > val.bidPrice ? acc : val.bidPrice;
        });
        console.log(max, Number(bid));
        if (max < Number(bid)) {
          setBidding(req, res, req.body.metadata);
        } else {
          console.log('haha');
          return res.send({ message: 'lowerThanMax' });
        }
      }
    } else {
      return res.send({ message: 'NoMoney' });
    }

    // Users.find({ userAddress: currentAddress }).then((response) => {
    //   if (response[0]?.token >= Number(bid)) {
    //     auctionData.find({ tokenId: tokenId }).then((result) => {
    //       console.log(result);
    //       if (result?.length === 0) {
    //         console.log('no!');
    //         setBidding(req, res, req.body.metadata);
    //         return res.status(400).send({ data: 'success' });
    //       } else {
    //         let max = result[0].biddingList.reduce((acc, val) => {
    //           console.log(val.bidPrice);
    //           return acc > val.bidPrice ? acc : val.bidPrice;
    //         });
    //         console.log(max, Number(bid));
    //         if (max < Number(bid)) {
    //           setBidding(req, res, req.body.metadata);
    //           return res.status(500).send({ data: 'success' });
    //         } else {
    //           console.log('haha');
    //           return res.status(300).send({ data: 'lowerThanMax' });
    //         }
    //       }
    //     });
    //   } else {
    //     return res.status(700).send({ data: 'NoMoney' });
    //   }
    // });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
