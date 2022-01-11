const express = require('express');
const router = express.Router();

const { mintNft } = require('../controllers/Mint.js');

router.post('/', (req, res) => {
  const { userAddress, type, name, description, price, metadata, imgURI } =
    req.body.metadata;
  // NFT 구현 필요
  const data = {
    userAddress: userAddress,
    name: name,
    description: description,
    imgURI: imgURI,
    metadata: metadata,
    price: price,
    type: type,
  };
  mintNft(req, res, data);
  // try {
  //   if (type === 'normal') {
  //   } else if (type === 'pro') {
  //   }
  // } catch (error) {}
});

module.exports = router;
