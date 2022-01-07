const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const SECRET = 'BEB-01-PROJECT-03';
const saltRounds = 10;

router.post('/login', async (req, res, next) => {
  const data = { userAddress: req.body.account[0], master: 'false' };
  const account = req.body.account[0];

  try {
    const isValid = await Users.findOne({ userAddress: account });
    let id, master, userAddress;
    console.log('isValid', isValid);
    if (!isValid) {
      const user = await new Users(data);
      await user.save();
      console.log('user', user);
      id = user._id.toString();
      master = user.master;
      userAddress = user.userAddress;
    } else {
      console.log(isValid);
      id = isValid._id.toString();
      master = isValid.master;
      userAddress = isValid.userAddress;
    }

    const token = jwt.sign(
      {
        id: id,
        userAddress: userAddress,
        master: master,
      },
      SECRET,
      { expiresIn: 86400 } // 24 시간
    );
    res.status(200).json({
      id,
      accessToken: token,
      userAddress,
      master,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
