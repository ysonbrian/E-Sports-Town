const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const users = require('../models/Users');
const normalData = require('../models/NormalData');
const auctionData = require('../models/AuctionData');
const proData = require('../models/ProData');
const erc20Abi = require('../contracts/abi/Erc20Abi');
const erc721Abi = require('../contracts/abi/Erc721Abi');
var erc20Contract = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
var erc721Contract = new web3.eth.Contract(erc721Abi, process.env.nftCA);

module.exports = {
  mintNft: async (req, res, data) => {
    const sendAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    const tokenUri = `https://ipfs.io/ipfs/${data.metadata}`;
    const nonce = await web3.eth.getTransactionCount(sendAccount, 'latest');

    const recieveAccount = data.userAddress;
    const contractData = erc721Contract.methods
      .mintNFT(recieveAccount, tokenUri)
      .encodeABI();
    const tx = {
      from: sendAccount,
      to: process.env.nftCA,
      nonce: nonce,
      gas: 5000000,
      data: contractData,
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);

    signPromise.then((signedTx) => {
      console.log(signedTx);
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        async function (err, hash) {
          console.log(err);
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
                console.log('Data stored in ProData Successfully');
              });
            }
          } else {
            console.log('failed!');
          }
        }
      );
    });
  },

  sendToken: async (req, res, userAddress) => {
    const sendAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    const nonce = await web3.eth.getTransactionCount(sendAccount, 'latest');
    const recieveAccount = userAddress;
    const contractData = erc20Contract.methods
      .transfer(recieveAccount, '1000000000000000000')
      .encodeABI();
    console.log(contractData);
    const tx = {
      from: sendAccount,
      to: process.env.erc20CA,
      nonce: nonce,
      gas: 5000000,
      data: contractData,
    };
    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
    signPromise.then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        async function (err, hash) {
          if (!err) {
            let newErc20Contract = new web3.eth.Contract(
              erc20Abi,
              process.env.erc20CA
            );
            const balance = await newErc20Contract.methods
              .balanceOf(recieveAccount)
              .call();
            console.log(balance / 1000000000000000000);
            const filter = { userAddress: recieveAccount.toLowerCase() };
            const update = { token: balance / 1000000000000000000 };
            let result = await users.findOneAndUpdate(filter, update);
            res.json({
              message: 'Erc20 Token success',
              message: hash,
              result: result,
            });
          } else {
            console.log(err);
            console.log('Failed!');
          }
        }
      );
    });
  },

  getBalanceOfErc20: async (userAddress) => {
    const balance = await erc20Contract.methods.balanceOf(userAddress).call();
    return balance;
  },

  setBidding: async (req, res, data) => {
    const spenderAccount = process.env.serverAddress;
    const currentAddress = data.currentAddress;
    const tokenOwnerAddress = data.tokenOwnerAddress;
    const tokenId = data.tokenId;
    const amount = Number(data.bid);
    console.log('amount', amount);
    const signature = data.signature;

    let contract = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
    const nonce = await web3.eth.getTransactionCount(
      data.currentAddress,
      'latest'
    );
    // let response = contract.methods.approve(spenderAccount, amount).encodeABI();
    let response = contract.methods
      .approve(spenderAccount, amount)
      .send({ from: data.currentAddress }, async (err, transactionHash) => {
        if (err) {
          console.log(err);
        } else {
          console.log('transactionHash: ' + transactionHash);

          if (tokenOwnerAddress === currentAddress) {
            console.log('Owner cannot bid the item!');
            return;
          }
          const result = await auctionData.findOne({ tokenId: tokenId });
          console.log(result);
          if (!result) {
            const newAuction = new auctionData({
              tokenId: tokenId,
              tokenOwnerAddress: tokenOwnerAddress,
              biddingList: [{ bidAddress: currentAddress, bidPrice: amount }],
            });
            newAuction.save().then((result) => {
              console.log('AuctionData Bid success!');
            });
            console.log(newAuction);
          } else {
            const newBid = { bidAddress: currentAddress, bidPrice: amount };
            auctionData.findOneAndUpdate(
              { tokenId: tokenId },
              { $push: { biddingList: newBid } },
              async (err, response) => {
                if (err) {
                  console.log('저장 실패!');
                } else {
                  console.log('현재 데이터', response);
                  const data = await auctionData.find({ tokenId: tokenId });
                  res.send({ data: data, message: 'success' });
                }
              }
            );
          }
          // const newAuction = new auctionData({
          //   tokenId: tokenId,
          //   tokenOwnerAddress: tokenOwnerAddress,
          //   biddingList:
          // });
          // const data = { currentAddress: currentAddress, amount: amount };
          // newAuction.addBid(data);
          // newAuction.save().then((result) => {
          //   console.log('Data stored in newAuction Successfully');
          // });
        }
      });

    console.log(response);

    // const tx = {
    //   from: data.currentAddress,
    //   to: process.env.erc20CA,
    //   nonce: nonce,
    //   gas: 5000000,
    //   data: response,
    // };
    // console.log(nonce);

    // const signPromise = web3.eth.sendTransaction(tx);

    // console.log(signPromise);
    // signPromise.then((signedTx) => {
    //   web3.eth.sendSignedTransaction(
    //     signedTx.rawTransaction,
    //     async function (err, hash) {
    //       if (!err) {
    //         res.json({
    //           message: 'Erc20 Token success',
    //           message: hash,
    //         });
    //       } else {
    //         console.log(err);
    //         console.log('Failed!');
    //       }
    //     }
    //   );
    // });
  },
};
