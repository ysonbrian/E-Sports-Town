const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const normalData = require('../models/NormalData');
const proData = require('../models/ProData');
const erc20Abi = require('../contracts/abi/Erc20Abi');
const erc721Abi = require('../contracts/abi/Erc721Abi');
var erc20Contract = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
var erc721Contract = new web3.eth.Contract(erc721Abi, process.env.nftCA);

module.exports = {
  mintNft: async (req, res, data) => {
    console.log(data.userAddress);
    const sendAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    const tokenUri = `https://ipfs.io/ipfs/${data.metadata}`;
    const nonce = await web3.eth.getTransactionCount(sendAccount, 'latest');
    console.log(nonce);

    const recieveAccount = data.userAddress;
    const contractData = erc721Contract.methods
      .mintNFT(recieveAccount, tokenUri)
      .encodeABI();
    console.log(data);
    const tx = {
      from: sendAccount,
      to: process.env.nftCA,
      nonce: nonce,
      gas: 5000000,
      data: contractData,
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
            if (data.type === 'normal') {
              const newNormalData = new normalData({
                userAddress: data.userAddress,
                name: data.name,
                description: data.description,
                imgURI: data.imgURI,
                tokenURI: tokenUri,
                tokenId: tokenId,
                price: data.price,
              });
              newNormalData.save().then((result) => {
                console.log('Data stored in NormalData Successfully');
              });
            } else if (data.type === 'pro') {
              const newProData = new proData({
                useAddress: data.userAddress,
                name: data.name,
                description: data.description,
                imgURI: data.imgUri,
                tokenURI: tokenUri,
                tokenId: tokenId,
                price: data.price,
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
