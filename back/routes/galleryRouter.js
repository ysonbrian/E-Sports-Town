const express = require('express');
const router = express.Router();

const NormalData = require('../models/NormalData');

router.get('/', async (req, res) => {
  try {
    const result = await NormalData.find();
    if (!result) {
      return res.send({ data: null });
    }
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
