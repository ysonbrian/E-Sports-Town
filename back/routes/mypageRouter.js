const express = require('express');
const router = express.Router();

const Users = require('../models/Users');
const NormalData = require('../models/NormalData');

router.post('/', async (req, res) => {
  try {
    const result = await NormalData.find({
      userAddress: req.body.userAddress,
    });
    if (!result) {
      res.send({ data: null });
    } else {
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/token', async (req, res) => {
  try {
    const result = await Users.find({ userAddress: req.body.userAddress });
    if (!result) {
      console.log('Not Found!');
    } else {
      console.log(result);
      return res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
