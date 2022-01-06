const express = require('express');
const router = express.Router();

const metadata = require('../controllers/MetadataController.js');

router.get('/', (req, res, next) => {
  console.log('This is Master Page');
});

router.post('/create', metadata.save);

module.exports = router;
