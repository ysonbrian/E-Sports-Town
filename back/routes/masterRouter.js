const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('This is Master Page');
});

module.exports = router;
