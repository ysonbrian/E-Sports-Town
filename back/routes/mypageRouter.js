const express = require('express');
const router = express.Router();

const NormalData = require('../models/NormalData');

router.post('/', async (req, res) => {
  console.log('mypageRouter', req);
  try {
    const result = await NormalData.find({
      userAddress: req.body.userAddress,
    });
    if (!result) {
      return res.send({ data: null });
    }
    console.log(result);
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
