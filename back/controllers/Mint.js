const Web3 = require('web3');
const web3 = new Web3(process.env.networkHost);
const db = require('../models');
const { Metadata } = require('../models');
const Erc20Abi = require('../contracts/abi');
const Erc721Abi = require('../contracts/abi');
var erc20Contract = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
var erc721Contract = new web3.eth.Contract(erc721Abi, process.env.nftCA);
