const express = require('express');
const router = express.Router();

const { mintNft, sendToken, setBidding } = require('../controllers/Mint.js');

router.post('/', async (req, res) => {
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
  setTimeout(() => {
    mintNft(req, res, data);
    return 'success';
  }, 1000);

  sendToken(req, res, req.body.metadata.userAddress);
});

module.exports = router;
