const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const users = require('../models/Users');
const normalData = require('../models/NormalData');
const auctionData = require('../models/AuctionData');
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
    console.log('RECIEVEACCOUNT, ', recieveAccount);
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

            console.log(tokenId + ' mint');
            const newNormalData = new normalData({
              userAddress: data.userAddress,
              name: data.name,
              description: data.description,
              imgURI: data.imgURI,
              tokenURI: tokenUri,
              tokenId: tokenId,
              price: data.price,
              type: 'normal',
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

  setMultiBidding: async (req, res, metadata) => {
    const { tokenId, tokenOwnerAddress, bid, currentAddress } = metadata;
    const spenderAccount = process.env.serverAddress;
    let contract = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
    const nonce = await web3.eth.getTransactionCount(currentAddress, 'latest');
    console.log(web3.utils.toWei(String(bid), 'ether'));
    contract.methods
      .approve(spenderAccount, web3.utils.toWei(String(bid), 'ether'))
      .send({ from: currentAddress }, async (err, transactionHash) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${currentAddress} 멀티 비드 성공`);
        }
      });
  },

  setApproveForAll: async (req, res, metadata) => {
    console.log(metadata);
    const serverAccount = process.env.serverAddress;
    const tokenOwnerAddress = metadata.userAddress;
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

  sellNft: async (req, res, metadata) => {
    // Erc721 contract에 ERC20 컨트렉트 부른후 IERC를 이용하면 transferFrom시 approve 안되는 오류발생
    console.log(metadata);
    const { tokenId, tokenOwnerAddress, bidAddress, price } = metadata;
    const serverAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    // console.log(tokenId, tokenOwnerAddress, bidAddress, metadata.bidPrice);
    const etherPrice = web3.utils.toWei(String(price), 'ether');
    let erc721Contract = new web3.eth.Contract(erc721Abi, process.env.nftCA);

    let { multiAuctionAddressList } = await multiAuctionData.findOne({
      tokenId: tokenId,
    });
    console.log('multiAuctionAddressList', multiAuctionAddressList);
    let beforeOwners = multiAuctionAddressList.map(
      (data) => data.multiAuctionAddress
    );
    if (multiAuctionAddressList.length !== 0) {
      await erc721Contract.methods
        .deleteOwners(beforeOwners, tokenId)
        .send({ from: serverAccount }, async (err, tx) => {
          if (!err) {
            console.log('MultiSigUsers deleted sucessfully!');
          } else {
            console.log('MultiSig delete failed!');
          }
        });
    }
    let nonce = await web3.eth.getTransactionCount(serverAccount, 'latest');
    const sellContract = erc721Contract.methods
      .sellNFT(bidAddress, tokenOwnerAddress, tokenId)
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
              console.log('Transfer Token Success!');
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

    if (multiAuctionAddressList.length !== 0) {
      console.log('토큰이 다중지분 이며 개인이 혼자 구매할때!');
      let maxMultiOwner = { multiAuctionAddress: '', bidPrice: 0 };
      // 다중지분 비드 리스트
      let multiBidList = multiAuctionAddressList.map((data) => data.bidPrice);
      // 다중지분 리스트 어카운트
      let multiBidAddress = multiAuctionAddressList.map(
        (data) => data.multiAuctionAddress
      );
      // maxOwner 결정
      multiAuctionAddressList.forEach((data) => {
        if (data.bidPrice > maxMultiOwner.bidPrice) {
          maxMultiOwner.multiAuctionAddress = data.multiAuctionAddress;
          maxMultiOwner.bidPrice = data.bidPrice;
        }
      });
      // 다중지분 비드 리스트 총합
      let totalBidList = multiAuctionAddressList
        .map((data) => data.bidPrice)
        .reduce((acc, cur) => acc + cur, 0);

      // 다중 옥션 유저들이 비드한 값을 먼저 서버 어카운트로 보낸다
      // 서버에 보내는 이유는 총 금액을 먼저 받아야 분배해서 돌려줄수 있기 때문

      let contract = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
      // Multiaddress erc20 토큰 tokenOwnerAddress로 보내기
      await contract.methods
        .transferFrom(bidAddress, serverAccount, etherPrice)
        .send({ from: serverAccount }, async (err, transactionHash) => {
          if (!err) {
            console.log('SingleAddress bid to Server success!', bidAddress);
          } else {
            console.log('SingleAddress transfer erc20 token to Server failed!');
          }
        });
      // 새로 판매되는 금액 / 그전에 구매했던 총금액 * 각 계정이 비드했던금액
      // 판매금액을 예전에 구매했던 가격에 비례해서 나눠주는 연산
      for (let i = 0; i < multiAuctionAddressList.length; i++) {
        let afterSumBid = (price / totalBidList) * multiBidList[i];
        let contract = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
        // Multiaddress erc20 토큰 tokenOwnerAddress로 보내기
        await contract.methods
          .transfer(
            multiAuctionAddressList[i].multiAuctionAddress,
            web3.utils.toWei(String(afterSumBid), 'ether')
          )
          .send({ from: serverAccount }, async (err, tx) => {
            if (!err) {
              console.log(
                'Server bid to MultiAccount success!',
                multiAuctionAddressList[i].multiAuctionAddress
              );
            } else {
              console.log(
                'Server transfer erc20 token to MultiAccount failed!'
              );
            }
          });
      }
      // 단일 지분 모든 거래 완료후 DB에 token값 바꾸기
      let ercCA = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
      let bidAddressBalance1 = await ercCA.methods.balanceOf(bidAddress).call();
      bidAddressBalance1 = bidAddressBalance1 / 1000000000000000000;
      let filter1 = {
        userAddress: bidAddress,
      };
      let update1 = {
        token: bidAddressBalance1,
      };
      users
        .findOneAndUpdate(filter1, update1)
        .then((response) => {
          console.log(response, '단일지분 토큰값 변경 성공!');
        })
        .catch((error) => console.log(error, '단일지분 토큰값 변경 실패!'));

      // 여기까지 다중 지분 소유자들이  단일 지분 비드를 받고 스마트컨트랙트는 완료
      // DB 수정
      for (let i = 0; i < multiAuctionAddressList.length; i++) {
        let erc20Contract = new web3.eth.Contract(
          erc20Abi,
          process.env.erc20CA
        );
        let bidAddressBalance = await erc20Contract.methods
          .balanceOf(multiAuctionAddressList[i].multiAuctionAddress)
          .call();
        bidAddressBalance = bidAddressBalance / 1000000000000000000;
        let filter = {
          userAddress: multiAuctionAddressList[i].multiAuctionAddress,
        };
        let update = {
          token: bidAddressBalance,
        };
        users
          .findOneAndUpdate(filter, update)
          .then((response) => {
            console.log(
              response,
              '다중지분 에서 단일지분으로 변경후 다중지분 토큰값 변경 성공'
            );
          })
          .catch((error) => {
            console.log(
              error,
              '다중지분 에서 단일지분으로 변경후 다중지분 토큰값 변경 실패'
            );
          });
        // normalData에 있는 multiAuctionAddressList 변경해주기

        let filter2 = {
          tokenId: tokenId,
        };
        let update2 = {
          userAddress: bidAddress,
          multiAuctionAddressList: [],
          type: 'normal',
        };
        normalData
          .findOneAndUpdate(filter2, update2)
          .then((response) => {
            console.log(
              response,
              'NormalData multiAuctionAddressList 데이터 변경 성공!'
            );
          })
          .catch((error) => {
            console.log(
              error,
              'NormalData multiAuctionAddressList 데이터 변경 실패!'
            );
          });
        // DB MultiAuctionList 지우기
        auctionData
          .findOneAndDelete({ tokenId: tokenId })
          .then((response) => {
            console.log(response, '해당 토큰 MultiAuction 데이터 삭제 성공!');
          })
          .catch((error) => {
            console.log(error, '해당 토큰 MultiAuction 데이터 삭제 실패!');
          });
      }
      res.send('Success');
    } else {
      // 토큰 주인이 단일 지분일때
      let newErc20Contract = new web3.eth.Contract(
        erc20Abi,
        process.env.erc20CA
      );
      newErc20Contract.methods
        .transferFrom(bidAddress, tokenOwnerAddress, etherPrice)
        .send({ from: serverAccount }, async (err, transactionHash) => {
          if (!err) {
            console.log('Transfer Token completed');
            if (multiAuctionAddressList.length === 0) {
              /////////////////////////////////////////////////////////////////////////////
              // 단일 지분 일경우
              let bidAddressBalance = await newErc20Contract.methods
                .balanceOf(bidAddress)
                .call();
              bidAddressBalance = bidAddressBalance / 1000000000000000000;
              let tokenOwnerAddressBalance = await newErc20Contract.methods
                .balanceOf(tokenOwnerAddress)
                .call();
              tokenOwnerAddressBalance =
                tokenOwnerAddressBalance / 1000000000000000000;
              console.log('balance1', bidAddressBalance);
              console.log('balance2', tokenOwnerAddressBalance);
              users
                .findOneAndUpdate(
                  { userAddress: bidAddress },
                  { token: bidAddressBalance }
                )
                .then((response) => {
                  console.log(response, 'bidAddress 성공!');
                })
                .catch((err) => console.log('bidAddress 실패!'));
              users
                .findOneAndUpdate(
                  { userAddress: tokenOwnerAddress },
                  { token: tokenOwnerAddressBalance }
                )
                .then((response) => {
                  console.log(response, 'tokenOwnerAddress 성공!');
                })
                .catch((err) => console.log('tokenOwnerAddress 실패!'));
              // 단일토큰 주인 변경
              const filter = { tokenId: tokenId };
              const update = { userAddress: bidAddress, type: 'normal' };
              normalData
                .findOneAndUpdate(filter, update)
                .then((response) => {
                  console.log('updated!: ', response);
                })
                .catch((err) =>
                  console.log(err, 'NFT 어카운트 주소 이전 실패!')
                );
              // 단일 비드 리스트 삭제
              auctionData
                .findOneAndDelete({ tokenId: tokenId })
                .then((response) => {
                  console.log('비드 데이터 삭제 성공!');
                })
                .catch((err) => console.log(err, '삭제 실패!'));
            } else {
              /////////////////////////////////////////////////////////////////////////////
              // 다중 지분 일경우
              let maxOwner = { userAddress: '', bidPrice: 0 };
              let multiAddressList = multiAuctionAddressList.map(
                (data) => data.userAddress
              );
              let multiBidList = multiAuctionAddressList.map(
                (data) => data.bidPrice
              );
              let etherMultiBidLsit = multiAuctionAddressList.map((data) =>
                web3.utils.toWei(String(data), 'ether')
              );
              maxOwner = multiAuctionAddressList.map((data) => {
                // 멀티유저중 가장 비드를 많이한 유저
                if (data.bidPrice > maxOwner.bidPrice) maxOwner = data;
              });
              let totalBidList = multiAuctionAddressList
                .map((data) => data.bidPrice)
                .reduce((acc, cur) => acc + cur, 0);

              //다중 지분 삭제
              let erc721Contract = new web3.eth.Contract(
                erc721Abi,
                process.env.nftCA
              );
              erc721Contract.methods
                .deleteOwners(multiAddressList, etherMultiBidLsit, tokenId)
                .send({ from: serverAccount }, async (err, tx) => {
                  if (!err) {
                    console.log('MultiSigUsers deleted sucessfully!');
                  } else {
                    console.log('MultiSig delete failed!');
                  }
                });
              // DB로 다중토큰 유저들 토큰 변경
              // 새로 판매되는 금액 / 그전에 구매했던 총금액 * 각 계정이 비드했던금액
              for (let i = 0; i < multiAuctionAddressList.length; i++) {
                let erc721Contract = new web3.eth.Contract(
                  erc721Abi,
                  process.env.nftCA
                );
                let bidAddressBalance = await erc721Contract.methods
                  .balanceOf(multiAuctionAddressList[i].userAddress)
                  .call();
                bidAddressBalance = bidAddressBalance / 1000000000000000000;
                let userBidPrice = multiAuctionAddressList[i].bidPrice;
                let updateBidPrice;
                let filter = {
                  userAddress: multiAuctionAddressList[i].userAddress,
                };
                let update = {
                  token:
                    bidAddressBalance +
                    Math.round(
                      (price / totalBidList) *
                      multiAuctionAddressList[i].bidPrice
                    ),
                };
                users
                  .findOneAndUpdate(filter, update)
                  .then((response) => {
                    console.log(
                      response,
                      '다중지분에서 단일 지분으로 변경후 다중지분 유저의 토큰값 변경 성공!'
                    );
                  })
                  .catch((error) => {
                    console.log(
                      error,
                      '다중지분에서 단일 지분으로 변경후 다중지분 유저의 토큰값 변경 실패!'
                    );
                  });
              }

              // DB로 다중토큰(multiAuctionAddressList) 데이터 빈배열로 변경
              const filter2 = { tokenId: tokenId };
              const update2 = {
                multiAuctionAddressList: [],
                type: 'normal',
              };
              normalData
                .findOneAndUpdate(filter2, update2)
                .then((response) => {
                  console.log("'다중토큰을 단일토큰으로 변경 성공!");
                })
                .catch((error) =>
                  console.log(
                    error,
                    '다중토큰을 단일토큰으로 변경했지만 multiAuctionAddressList 데이터는 변경실패!'
                  )
                );
            }
            res.send('Success!');
          } else {
            console.log(err);
          }
        });
    }
  },
  sellMultiNft: async (req, res, metadata) => {
    // Erc721 contract에 ERC20 컨트렉트 부른후 IERC를 이용하면 transferFrom시 approve 안되는 오류발생
    const {
      tokenId,
      tokenOwnerAddress,
      bidAddressNPrice,
      type,
      price,
      multiAuctionList,
      multiAuctionBidList,
      maxOwnerAddress,
      maxOwnerBidPrice,
    } = metadata;
    console.log('HAHAHAH', metadata);

    const serverAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    const bidAddressLength = bidAddressNPrice.length;
    const totalBidList = bidAddressNPrice.map((el) => el.bidPrice);
    // multiAuctionBidList로 받은 유저의 비드를 이더로 변경 하여 리스트로 리턴
    const etherBid = multiAuctionBidList.map((el) =>
      web3.utils.toWei(String(el), 'ether')
    );
    let { multiAuctionAddressList } = await normalData.findOne({
      tokenId: tokenId,
    });
    console.log('multiAuctionAddressList', multiAuctionAddressList);

    console.log('etherBid', etherBid);
    const totalBid = bidAddressNPrice
      .map((data) => Number(data.bidPrice))
      .reduce((acc, cur) => acc + cur, 0);
    // 프론트에서 받은 총 비드 금액 이더로 변경
    const etherTotalBid = web3.utils.toWei(String(totalBid), 'ether');
    let erc721Contract = new web3.eth.Contract(erc721Abi, process.env.nftCA);

    //먼저 다중지분이 등록되어있는 MultiAuction 컨트랙트의 deleteOwners를 호출
    let beforeOwners = multiAuctionAddressList.map(
      (data) => data.multiAuctionAddress
    );
    let multiOw = multiAuctionAddressList.map((el) =>
      web3.utils.toWei(String(el.bidPrice), 'ether')
    );
    console.log('beforeOwners!', beforeOwners);
    if (multiAuctionAddressList.length !== 0) {
      await erc721Contract.methods
        .deleteOwners(beforeOwners, tokenId)
        .send({ from: serverAccount }, async (err, tx) => {
          if (!err) {
            console.log('MultiSigUsers deleted sucessfully!');
          } else {
            console.log('MultiSig delete failed!');
          }
        });
    }
    console.log(totalBid, etherTotalBid);

    let nonce = await web3.eth.getTransactionCount(serverAccount, 'latest');
    const sellContract = erc721Contract.methods
      .sellMultiNFT(
        maxOwnerAddress,
        tokenOwnerAddress,
        tokenId,
        multiAuctionList,
        etherBid
      )
      .encodeABI();
    const tx = {
      from: serverAccount,
      to: process.env.nftCA,
      nonce: nonce,
      gas: 5000000,
      data: sellContract,
    };

    // 이밑에 안에다가 넣기
    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          async (err, hash) => {
            if (!err) {
              console.log('Transfer Token completed');
              // 토큰이 다중 지분이 있는경우
            } else {
              console.log(err);
              console.log('sellMultiNFT failed!!');
            }
          }
        );
      })
      .catch((err) => {
        console.log('Promise failed:', err);
      });
    //다중지분 토큰 주인이 판매할때
    if (multiAuctionAddressList.length !== 0) {
      console.log('다중지분 토큰 주인이 판매할때!');

      // 멀티 비드 리스트
      let multiBidList = multiAuctionAddressList.map((data) => data.bidPrice);

      // 멀티 비드 리스트 총합
      let totalBidList = multiAuctionAddressList
        .map((data) => data.bidPrice)
        .reduce((acc, cur) => acc + cur, 0);

      // 다중 옥션 유저들이 비드한 값을 먼저 서버 어카운트로 보낸다
      // 서버에 보내는 이유는 총 금액을 먼저 받아야 분배해서 돌려줄수 있기 때문
      for (let i = 0; i < bidAddressLength; i++) {
        let contract = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
        // Multiaddress erc20 토큰 tokenOwnerAddress로 보내기
        await contract.methods
          .transferFrom(multiAuctionList[i], serverAccount, etherBid[i])
          .send({ from: serverAccount }, async (err, transactionHash) => {
            if (!err) {
              console.log(
                'MultiAddress bid to Server success!',
                multiAuctionList[i]
              );
            } else {
              console.log(
                'MultiAddress transfer erc20 token to Server failed!'
              );
            }
          });
      }
      for (let i = 0; i < multiAuctionAddressList.length; i++) {
        // 새로 판매되는 금액 / 그전에 구매했던 총금액 * 각 계정이 비드했던금액
        // 판매금액을 예전에 구매했던 가격에 비례해서 나눠주는 연산
        let afterSumBid = (price / totalBidList) * multiBidList[i];
        let contract = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
        // Multiaddress erc20 토큰 tokenOwnerAddress로 보내기
        await contract.methods
          .transfer(
            multiAuctionAddressList[i].multiAuctionAddress,
            web3.utils.toWei(String(afterSumBid), 'ether')
          )
          .send({ from: serverAccount }, async (err, tx) => {
            if (!err) {
              console.log(
                'Server bid to MultiAddress success!',
                multiAuctionAddressList[i].multiAuctionAddress
              );
            } else {
              console.log(
                'Server transfer erc20 token to MultiAddress failed!'
              );
            }
          });
      } // 여기까지 다중 지분 소유자들이 다중 지분 비드를 받고 스마트컨트랙트는 완료
      // DB 수정
      for (let i = 0; i < multiAuctionAddressList.length; i++) {
        let erc20Contract = new web3.eth.Contract(
          erc20Abi,
          process.env.erc20CA
        );
        let bidAddressBalance = await erc20Contract.methods
          .balanceOf(multiAuctionAddressList[i].multiAuctionAddress)
          .call();
        bidAddressBalance = bidAddressBalance / 1000000000000000000;
        let filter = {
          userAddress: multiAuctionAddressList[i].multiAuctionAddress,
        };
        let update = {
          token: bidAddressBalance,
        };
        users
          .findOneAndUpdate(filter, update)
          .then((response) => {
            console.log(
              response,
              '다중지분 에서 다중지분으로 토큰값 변경 성공'
            );
          })
          .catch((error) => {
            console.log(error, '다중지분 에서 다중지분으로 토큰값 변경 실패');
          });
      }
      let filter2 = {
        tokenId: tokenId,
      };
      let update2 = {
        userAddress: maxOwnerAddress,
        multiAuctionAddressList: bidAddressNPrice,
        type: 'multi',
      };
      normalData
        .findOneAndUpdate(filter2, update2)
        .then((response) => console.log(response, 'NormalData 변경 성겅!'))
        .catch((error) => console.log(error, 'NormalData 변경 실패!'));

      // DB MultiAuctionList 지우기
      multiAuctionData
        .findOneAndDelete({ tokenId: tokenId })
        .then((response) => {
          console.log(response, '해당 토큰 MultiAuction 데이터 삭제 성공!');
        })
        .catch((error) => {
          console.log(error, '해당 토큰 MultiAuction 데이터 삭제 실패!');
        });

      // DB auction TokenOwner 변경
      auctionData
        .findOneAndDelete({ tokenId: tokenId })
        .then((response) => {
          console.log(response, '해당 토큰 Auction 데이터 삭제 성공!');
        })
        .catch((error) => {
          console.log(error, '해당 토큰 Auction 데이터 삭제 실패!');
        });
      res.send('Success');
      // 단일 토큰이 다중 비드한테 팔 때
      // 토큰이 다중지분이 아닐때

    } else {
      console.log('Else!!!!!!!');
      console.log('중간체크 ', bidAddressLength);
      // 단일지분이 낸 총금액을 기존에 다중 지분 유저에게 분배
      // bidAddressLength = multiauction 에서 비드한 주소 리스트 길이
      // multiAuctionList = multiauction 에서 비드한 주소 리스트
      for (let i = 0; i < bidAddressLength; i++) {
        let erc721Contract = new web3.eth.Contract(
          erc721Abi,
          process.env.nftCA
        );
        let bidAddressBalance = await erc721Contract.methods
          .balanceOf(multiAuctionList[i])
          .call();
        bidAddressBalance = bidAddressBalance / 1000000000000000000;
        let afterSumBid = Math.round(
          (price / totalBidList[i]) * multiAuctionBidList[i]
        );
        console.log('CHECK! ', price, totalBidList[i], multiAuctionBidList[i]);
        console.log('afterSumBid ', afterSumBid);
        console.log('hahaha', web3.utils.toWei(String(afterSumBid), 'ether'));
        let contract = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
        console.log('for문!', multiAuctionList[i]);
        // Multiaddress erc20 토큰 tokenOwnerAddress로 보내기
        contract.methods
          .transferFrom(
            multiAuctionList[i],
            tokenOwnerAddress,
            web3.utils.toWei(String(multiAuctionBidList[i]), 'ether')
          )
          .send({ from: serverAccount }, async (err, transactionHash) => {
            if (!err) {
              console.log(
                'MultiAddress bid to Server success!',
                multiAuctionList[i]
              );
            } else {
              console.log(
                'MultiAddress transfer erc20 token to Server failed!'
              );
            }
          });
      }
      //DB 판매한 유저 업데이트
      let erc20Contract = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
      let tokenOwnerBalance = await erc20Contract.methods
        .balanceOf(tokenOwnerAddress)
        .call();
      tokenOwnerBalance = tokenOwnerBalance / 1000000000000000000;
      let filter3 = {
        userAddress: tokenOwnerAddress,
      };
      let update3 = {
        price: tokenOwnerBalance,
      };
      users
        .findOneAndUpdate(filter3, update3)
        .then((response) => {
          console.log(response, '판매한 유저 업데이트 성공');
        })
        .catch((error) => {
          console.log(error, '판매한 유저 업데이트 실패');
        });
      // DB 멀티한 비드유저 업데이트
      for (let i = 0; i < bidAddressLength; i++) {
        let erc20Contract = new web3.eth.Contract(
          erc20Abi,
          process.env.erc20CA
        );
        let bidAddressBalance = await erc20Contract.methods
          .balanceOf(multiAuctionList[i])
          .call();
        console.log(bidAddressBalance);
        bidAddressBalance = bidAddressBalance / 1000000000000000000;
        let filter = {
          userAddress: multiAuctionList[i],
        };
        let update = {
          price: bidAddressBalance,
        };
        users
          .findOneAndUpdate(filter, update)
          .then((response) => {
            console.log(
              response,
              '다중지분에서 단일 지분으로 변경후 다중지분 유저의 토큰값 변경 성공!'
            );
          })
          .catch((error) => {
            console.log(
              error,
              '다중지분에서 단일 지분으로 변경후 다중지분 유저의 토큰값 변경 실패!'
            );
          });
      }
      // DB 노멀데이터 MultiOwners 변경
      let filter2 = {
        tokenId: tokenId,
      };
      let update2 = {
        userAddress: maxOwnerAddress,
        multiAuctionAddressList: bidAddressNPrice,
        type: 'multi',
      };
      // 단일 옥션비드리스트 삭제
      normalData
        .findOneAndUpdate(filter2, update2)
        .then((response) => {
          console.log(
            response,
            'NormalData multiAuctionAddressList 데이터 변경 성공!'
          );
        })
        .catch((error) => {
          console.log(
            error,
            'NormalData multiAuctionAddressList 데이터 변경 실패!'
          );
        });

      // DB MultiAuctionList 지우기
      multiAuctionData
        .findOneAndDelete({ tokenId: tokenId })
        .then((response) => {
          console.log(response, '해당 토큰 MultiAuction 데이터 삭제 성공!');
        })
        .catch((error) => {
          console.log(error, '해당 토큰 MultiAuction 데이터 삭제 실패!');
        });
      res.send('Success');
    }
  },
};
