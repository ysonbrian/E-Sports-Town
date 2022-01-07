const express = require('express');
const router = express.Router();
const Metadata = require('../models/MetaData');

router.post('/', (req, res) => {
  const { userAddress, type, name, description, price, path, imgURI } =
    req.body.metadata;
});

module.exports = router;
