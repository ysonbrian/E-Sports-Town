const express = require('express');
const router = express.Router();

const NormalData = require('../models/NormalData');

router.post('/', async (req, res) => {
  const { userAddress } = req.body;
  console.log(userAddress);
  try {
    const result = await NormalData.find({
      'multiAuctionAddressList.multiAuctionAddress': userAddress,
      type: 'multi',
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
  // try {
  // } catch (error) {
  //   console.log(error);
  // }
});

module.exports = router;
