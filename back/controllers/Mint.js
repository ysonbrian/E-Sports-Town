const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const users = require('../models/Users');
const normalData = require('../models/NormalData');
const auctionData = require('../models/AuctionData');
const proData = require('../models/ProData');

const multiAuctionData = require('../models/MultiAuctionData');

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
    const price = data.price + '000000000000000000';
    const recieveAccount = data.userAddress;
    const contractData = erc721Contract.methods
      .mintNFT(recieveAccount, tokenUri, price)
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
          } else {
            console.log('failed!');
          }
        }
      );
    });
  },
  mint20Token: async (req, res, userAddress) => {
    const sendAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    const recieveAccount = userAddress;
    const nonce = await web3.eth.getTransactionCount(sendAccount, 'latest');
    const contractData = erc20Contract.methods
      .mintToken(recieveAccount, process.env.nftCA, '1000000000000000000')
      .encodeABI();

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
            console.log('mint20Token Failed!');
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
    const amount = data.bid;
    console.log('amount', amount);
    const signature = data.signature;

    let contract = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
    const nonce = await web3.eth.getTransactionCount(
      data.currentAddress,
      'latest'
    );
    // let response = contract.methods.approve(spenderAccount, amount).encodeABI();
    let response = contract.methods
      .approve(spenderAccount, web3.utils.toWei(amount, 'ether'))
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
              res.send({ data: data, message: 'success' });
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
        }
      });
  },

  setApproveForAll: async (req, res, metadata) => {
    console.log(metadata);
    const serverAccount = process.env.serverAddress;
    const tokenOwnerAddress = metadata;
    // const contract = await erc721Contract.methods
    //   .setApprovalForAll(serverAccount, true)
    //   .encodeABI();
    let contract = new web3.eth.Contract(erc721Abi, process.env.nftCA);

    const nonce = await web3.eth.getTransactionCount(
      tokenOwnerAddress,
      'latest'
    );

    contract.methods
      .setApprovalForAll(serverAccount, true)
      .send({ from: tokenOwnerAddress }, async (err, transactionHash) => {
        if (err) {
          console.log(err);
        } else {
          console.log('setApprovalForAll success!');
          console.log(transactionHash);
        }
      });
  },

  setToken: async (req, res) => {
    const serverAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    const nonce = await web3.eth.getTransactionCount(serverAccount, 'latest');
    let contract = new web3.eth.Contract(erc721Abi, process.env.nftCA);
    const data = contract.methods.setToken(process.env.erc20CA).encodeABI();

    const tx = {
      from: serverAccount,
      to: process.env.nftCA,
      nonce: nonce,
      gas: 5000000,
      data: data,
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          async function (err, hash) {
            if (!err) {
              console.log('setToken function successed');
            } else {
              console.log(err);
            }
          }
        );
      })
      .catch((err) => {
        console.log('Promise failed:', err);
      });
  },

  // setMulti: async (req, res) => {
  //   const serverAccount = process.env.serverAddress;
  //   const privateKey = process.env.serverAddress_PK;
  //   const nonce = await web3.eth.getTransactionCount(serverAccount, 'latest');
  //   let contract = new web3.eth.Contract(erc721Abi, process.env.nftCA);
  //   const data = contract.methods
  //     .setMultiContract(process.env.multiCA)
  //     .encodeABI();

  //   const tx = {
  //     from: serverAccount,
  //     to: process.env.nftCA,
  //     nonce: nonce,
  //     gas: 5000000,
  //     data: data,
  //   };
  //
  //   const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
  //   signPromise
  //     .then((signedTx) => {
  //       web3.eth.sendSignedTransaction(
  //         signedTx.rawTransaction,
  //         async function (err, hash) {
  //           if (!err) {
  //             console.log('setToken function successed');
  //           } else {
  //             console.log(err);
  //           }
  //         }
  //       );
  //     })
  //     .catch((err) => {
  //       console.log('Promise failed:', err);
  //     });
  // },

  sellNft: async (req, res, metadata) => {
    // Erc721 contract에 ERC20 컨트렉트 부른후 IERC를 이용하면 transferFrom시 approve 안되는 오류발생
    const { tokenId, tokenOwnerAddress, bidAddress } = metadata;
    const serverAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    const nonce = await web3.eth.getTransactionCount(serverAccount, 'latest');
    console.log(tokenId, tokenOwnerAddress, bidAddress, metadata.bidPrice);
    const etherPrice = String(metadata.bidPrice) + '000000000000000000';

    const sellContract = erc721Contract.methods
      .sellNFT(bidAddress, tokenOwnerAddress, tokenId, etherPrice)
      .encodeABI();

    const tx = {
      from: serverAccount,
      to: process.env.nftCA,
      nonce: nonce,
      gas: 5000000,
      data: sellContract,
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          async (err, hash) => {
            if (!err) {
              let newErc20Contract = new web3.eth.Contract(
                erc20Abi,
                process.env.erc20CA
              );
              newErc20Contract.methods
                .transferFrom(bidAddress, tokenOwnerAddress, etherPrice)
                .send({ from: serverAccount }, async (err, transactionHash) => {
                  if (!err) {
                    console.log('Transfer Token completed');
                    let balance1 = await newErc20Contract.methods
                      .balanceOf(bidAddress)
                      .call();
                    balance1 = balance1 / 1000000000000000000;
                    let balance2 = await newErc20Contract.methods
                      .balanceOf(tokenOwnerAddress)
                      .call();
                    balance2 = balance2 / 1000000000000000000;
                    console.log('balance1', balance1);
                    console.log('balance2', balance2);
                    users
                      .findOneAndUpdate(
                        { userAddress: bidAddress },
                        { token: balance1 }
                      )
                      .then((response) => {
                        console.log(response, 'bidAddress 성공!');
                      })
                      .catch((err) => console.log('bidAddress 실패!'));
                    users
                      .findOneAndUpdate(
                        { userAddress: tokenOwnerAddress },
                        { token: balance2 }
                      )
                      .then((response) => {
                        console.log(response, 'tokenOwnerAddress 성공!');
                      })
                      .catch((err) => console.log('tokenOwnerAddress 실패!'));

                    res.send('Success!');
                  } else {
                    console.log(err);
                  }
                });
              const filter = { tokenId: tokenId };
              const update = { userAddress: bidAddress };
              normalData
                .findOneAndUpdate(filter, update)
                .then((response) => {
                  console.log('updated!: ', response);
                })
                .catch((err) =>
                  console.log(err, 'NFT 어카운트 주소 이전 실패!')
                );
              auctionData
                .findOneAndDelete({ tokenId: tokenId })
                .then((response) => {
                  console.log('비드 데이터 삭제 성공!');
                })
                .catch((err) => console.log(err, '삭제 실패!'));
            } else {
              console.log(err);
              console.log('sellNFT failed!!');
            }
          }
        );
      })
      .catch((err) => {
        console.log('Promise failed:', err);
      });
  },
  sellMultiNft: async (req, res, metadata) => {
    // Erc721 contract에 ERC20 컨트렉트 부른후 IERC를 이용하면 transferFrom시 approve 안되는 오류발생
    // const { tokenId, tokenOwnerAddress, bidAddress } = metadata;
    console.log(metadata);

    const serverAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    const nonce = await web3.eth.getTransactionCount(serverAccount, 'latest');
    const etherPrice = String(metadata.bidPrice) + '000000000000000000';
    const bidAddressLength = metadata.bidAddressNPrice.length;
    const totalBidList = metadata.bidAddressNPrice.map((el) => el.bidPrice);
    const totalBid = metadata.bidAddressNPrice
      .map((data) => Number(data.bidPrice))
      .reduce((acc, cur) => acc + cur, 0);

    console.log(totalBid);
    for (let i = 0; i < bidAddressLength; i++) {
      let contract = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
      const nonce = await web3.eth.getTransactionCount(
        metadata.bidAddressNPrice[i].multiAuctionAddress,
        'latest'
      );
      // 각 계정마다 Erc20토큰 approve 받기
      contract.methods
        .approve(
          serverAccount,
          web3.utils.toWei(
            String(metadata.bidAddressNPrice[i].bidPrice),
            'ether'
          )
        )
        .send(
          { from: metadata.bidAddressNPrice[i].multiAuctionAddress },
          async (err, transactionHash) => {
            if (err) {
              console.log(err);
            } else {
              console.log(
                metadata.bidAddressNPrice[i].multiAuctionAddress,
                'bid approved success!'
              );
            }
          }
        );
    }
    const sellContract = erc721Contract.methods
      .sellMultiNFT(
        metadata.maxOwnerAddress,
        tokenOwnerAddress,
        tokenId,
        totalBid,
        totalBidList
      )
      .encodeABI();

    // const tx = {
    //   from: serverAccount,
    //   to: process.env.nftCA,
    //   nonce: nonce,
    //   gas: 5000000,
    //   data: sellContract,
    // };

    // const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
    // signPromise
    //   .then((signedTx) => {
    //     web3.eth.sendSignedTransaction(
    //       signedTx.rawTransaction,
    //       async (err, hash) => {
    //         if (!err) {
    //           let newErc20Contract = new web3.eth.Contract(
    //             erc20Abi,
    //             process.env.erc20CA
    //           );
    //           newErc20Contract.methods
    //             .transferFrom(bidAddress, tokenOwnerAddress, etherPrice)
    //             .send({ from: serverAccount }, async (err, transactionHash) => {
    //               if (!err) {
    //                 console.log('Transfer Token completed');
    //                 let balance1 = await newErc20Contract.methods
    //                   .balanceOf(bidAddress)
    //                   .call();
    //                 balance1 = balance1 / 1000000000000000000;
    //                 let balance2 = await newErc20Contract.methods
    //                   .balanceOf(tokenOwnerAddress)
    //                   .call();
    //                 balance2 = balance2 / 1000000000000000000;
    //                 console.log('balance1', balance1);
    //                 console.log('balance2', balance2);
    //                 users
    //                   .findOneAndUpdate(
    //                     { userAddress: bidAddress },
    //                     { token: balance1 }
    //                   )
    //                   .then((response) => {
    //                     console.log(response, 'bidAddress 성공!');
    //                   })
    //                   .catch((err) => console.log('bidAddress 실패!'));
    //                 users
    //                   .findOneAndUpdate(
    //                     { userAddress: tokenOwnerAddress },
    //                     { token: balance2 }
    //                   )
    //                   .then((response) => {
    //                     console.log(response, 'tokenOwnerAddress 성공!');
    //                   })
    //                   .catch((err) => console.log('tokenOwnerAddress 실패!'));

    //                 res.send('Success!');
    //               } else {
    //                 console.log(err);
    //               }
    //             });
    //           const filter = { tokenId: tokenId };
    //           const update = { userAddress: bidAddress };
    //           normalData
    //             .findOneAndUpdate(filter, update)
    //             .then((response) => {
    //               console.log('updated!: ', response);
    //             })
    //             .catch((err) =>
    //               console.log(err, 'NFT 어카운트 주소 이전 실패!')
    //             );
    //           auctionData
    //             .findOneAndDelete({ tokenId: tokenId })
    //             .then((response) => {
    //               console.log('비드 데이터 삭제 성공!');
    //             })
    //             .catch((err) => console.log(err, '삭제 실패!'));
    //         } else {
    //           console.log(err);
    //           console.log('sellNFT failed!!');
    //         }
    //       }
    //     );
    //   })
    //   .catch((err) => {
    //     console.log('Promise failed:', err);
    //   });
  },
};
