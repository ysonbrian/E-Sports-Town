const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { userAddress, type, name, description, price, path, imgURI } =
    req.body.metadata;

  // NFT 구현 필요
});

module.exports = router;
