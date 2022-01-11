const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const normalData = require('../models/NormalData');
const proData = require('../models/ProData');
const erc20Abi = require('../contracts/abi/Erc20Abi');
const erc721Abi = require('../contracts/abi/Erc721Abi');
var erc20Contract = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
var erc721Contract = new web3.eth.Contract(erc721Abi, process.env.nftCA);

module.exports = {
  mintNft: async (req, res, metadata) => {
    console.log(metadata.userAddress);
    const sendAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    const tokenUri = `https://ipfs.io/ipfs/${metadata.path}`;
    const nonce = await web3.eth.getTransactionCount(sendAccount, 'latest');
    console.log(nonce);

    const recieveAccount = metadata.userAddress;
    const data = erc721Contract.methods
      .mintNFT(recieveAccount, tokenUri)
      .encodeABI();
    console.log(data);
    const tx = {
      from: sendAccount,
      to: process.env.nftCA,
      nonce: nonce,
      gas: 5000000,
      data: data,
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
    let outTokenId = 0;
    console.log(signPromise);

    signPromise.then((signedTx) => {
      console.log(signedTx);
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        async function (err, hash) {
          // console.log(err);
          if (!err) {
            let newErc721Contract = new web3.eth.Contract(
              erc721Abi,
              process.env.nftCA
            );
            const tokenId = await newErc721Contract.methods
              .checkTokenId(tokenUri)
              .call();

            console.log(tokenId + 'mint');
            if (metadata.type === 'normal') {
              const newNormalData = new normalData({
                useAddress: metadata.userAddress,
                name: metadata.name,
                description: metadata.description,
                imgURI: metadata.imgUri,
                tokenURI: tokenUri,
                tokenId: tokenId,
                price: metadata.price,
              });
              newNormalData.save().then((result) => {
                console.log('Data stored in NormalData Successfully');
              });
            } else if (metadata.type === 'pro') {
              const newProData = new proData({
                useAddress: metadata.userAddress,
                name: metadata.name,
                description: metadata.description,
                imgUri: metadata.imgUri,
                tokenUri: tokenUri,
                tokenId: tokenId,
                price: metadata.price,
              });
              newProData.save().then((result) => {
                console.log('Data stored in NormalData Successfully');
              });
            }
          } else {
            console.log('failed!');
          }
        }
      );
      // .on('receipt',());
    });
  },
};
