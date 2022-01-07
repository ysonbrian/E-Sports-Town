const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('This is normal Page');
});

module.exports = router;
