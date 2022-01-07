const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
  console.log('This is Auction Page');
});

module.exports = router;
