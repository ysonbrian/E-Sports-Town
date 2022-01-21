const express = require('express');
const router = express.Router();

const {
  mintNft,
  sendToken,
  setBidding,
  setApproveForAll,
  mint20Token,
} = require('../controllers/Mint.js');

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

  mintNft(req, res, data);

  setTimeout(() => {
    // mint20Token(req, res, req.body.metadata.userAddress);
    sendToken(req, res, req.body.metadata.userAddress);
    return 'success';
  }, 1000);
  setTimeout(() => {
    setApproveForAll(req, res, data);
  }, 3000);
});

module.exports = router;
