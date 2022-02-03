const express = require('express');
const router = express.Router();

const { changeVoteState, voteToken } = require('../controllers/Vote.js');

const NormalData = require('../models/NormalData');
const VoteState = require('../models/VoteState');

router.post('/', async (req, res) => {
  const { userAddress } = req.body;
  console.log(userAddress);
  try {
    const result = await NormalData.find({
      'multiAuctionAddressList.multiAuctionAddress': userAddress,
      votedFinished: false,
    });
    console.log(result);
    if (!result) {
      return res.send({ data: null });
    }
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/voting', async (req, res) => {
  const { metadata } = req.body;
  console.log(metadata);
  voteToken(req, res, metadata);

  // try {
  // } catch (error) {
  //   console.log(error);
  // }
});

router.post('/:id/votestate', async (req, res) => {
  const { metadata } = req.body;

  try {
    const result = await VoteState.find({
      tokenId: metadata.tokenId,
    });
    if (!result) {
      return res.send({ data: null });
    }
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/votestatechange', async (req, res) => {
  const { metadata } = req.body;
  console.log(metadata);

  changeVoteState(req, res, metadata);
  // try {
  //   const result = await VoteState.find({
  //     tokenId: metadata.tokenId,
  //   });
  //   console.log('HAHAHAH', result);
  //   if (!result) {
  //     return res.send({ data: null });
  //   }
  //   return res.send(result);
  // } catch (error) {
  //   console.log(error);
  // }
});

module.exports = router;
