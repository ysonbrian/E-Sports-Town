const express = require('express');
const router = express.Router();
// const metadata = require('../models/Metadata');
const metadata = require('../controllers/MetadataController');
// router.post('/', (req, res, next) => {
//   // console.log('This is CreateNFT Page!');

//   // metadata.save().then((res) => console.log(res));
// });
router.post('/', metadata.save);
router.get('/getdata', metadata.findAll);

module.exports = router;
