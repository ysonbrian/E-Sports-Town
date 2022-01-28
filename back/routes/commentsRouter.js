const express = require('express');
const router = express.Router();
const normalComments = require('../models/NormalComments');

router.post('/normal', async (req, res) => {
  const { id, userAddress, comment } = req.body.metadata;
  const data = {
    id,
    userAddress,
    comment,
  };
  const normalComment = await new normalComments(data);
  normalComment.save().then((response) => {
    console.log('Success!');
    res.send();
  });
});

router.post('/normal/fetch', async (req, res) => {
  normalComments
    .find({ id: req.body.metadata })
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((error) => {
      console.log(error, 'Normal Comments 불러오기 실패!');
    });
});

module.exports = router;
