const Web3 = require('web3');
//const web3 = new Web3('HTTP://127.0.0.1:7545');
const web3 = new Web3('https://ropsten.infura.io/v3/436b0f56d4ab4eafbd26f3b86e1113be');
const users = require('../models/Users');
const normalData = require('../models/NormalData');
const auctionData = require('../models/AuctionData');
const multiAuctionData = require('../models/MultiAuctionData');
const voteState = require('../models/VoteState');

const erc20Abi = require('../contracts/abi/Erc20Abi');
const erc721Abi = require('../contracts/abi/Erc721Abi');
const voteAbi = require('../contracts/abi/VoteAbi');
var erc20Contract = new web3.eth.Contract(erc20Abi, process.env.erc20CA);
var erc721Contract = new web3.eth.Contract(erc721Abi, process.env.nftCA);
const voteContract = new web3.eth.Contract(voteAbi, process.env.voteCA);

module.exports = {
  changeVoteState: async (req, res, state) => {
    const {
      tokenId,
      reqState,
      multiAuctionAddressList,
      multiAuctionAddressListPrice,
      multiAuctionAddressListLength,
    } = state;
    const serverAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    let tokenState;
    let changeDBState;
    if (reqState === 'Initial') {
      let cont = new web3.eth.Contract(voteAbi, process.env.voteCA);
      tokenState = cont.methods.initialState(tokenId).encodeABI();
      changeDBState = 'Created';
    } else if (reqState === 'Ended') {
      let cont = new web3.eth.Contract(voteAbi, process.env.voteCA);
      tokenState = cont.methods.initialState(tokenId).encodeABI();
      changeDBState = 'Created';
      for (let i = 0; i < multiAuctionAddressListLength; i++) {
        const filter = {
          tokenId: tokenId,
          'multiAuctionAddressList.multiAuctionAddress':
            multiAuctionAddressList[i],
        };
        const update = {
          'multiAuctionAddressList.$.isVoted': false,
        };

        normalData
          .findOneAndUpdate(filter, update)
          .then((response) => {
            console.log(response, 'Ended = Normaldata isVoted 변경 완료!');
          })
          .catch((err) => {
            console.log(err, 'Ended = Normaldata isVoted 변경 실패!');
          });
      }
    } else {
      let cont = new web3.eth.Contract(voteAbi, process.env.voteCA);
      tokenState = cont.methods.startState(tokenId).encodeABI();
      changeDBState = 'Initial';
    }

    let nonce = await web3.eth.getTransactionCount(serverAccount, 'latest');

    const tx = {
      from: serverAccount,
      to: process.env.voteCA,
      nonce: nonce,
      gas: 5000000,
      data: tokenState,
    };
    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          async (err, hash) => {
            if (!err) {
              console.log('Initial: State changed to Started');
              const filter = { tokenId: tokenId };
              const update = { state: changeDBState };
              voteState
                .findOneAndUpdate(filter, update)
                .then((response) => {
                  console.log(response, 'VoteState 변경 완료!');
                })
                .catch((err) => {
                  console.log(err, 'VoteState 변경 실패!');
                });
            } else {
              console.log(err);
              console.log('Initial: State changed failed!');
            }
          }
        );
      })
      .catch((err) => {
        console.log('Promise failed: ', err);
      });
    for (let i = 0; i < multiAuctionAddressListLength; i++) {
      let cont = new web3.eth.Contract(voteAbi, process.env.voteCA);
      let contract = cont.methods
        .addVoter(
          multiAuctionAddressList[i],
          multiAuctionAddressListPrice[i],
          tokenId
        )
        .send({ from: serverAccount }, async (err, response) => {
          if (!err) {
            console.log(
              'VoteState Stated 변경후 addVoter 성공! ',
              multiAuctionAddressList[i]
            );
          } else {
            console.log(err);
            console.log(
              'VoteState Stated 변경후 addVoter 실패! ',
              multiAuctionAddressList[i]
            );
          }
        });
    }
    let cont2 = new web3.eth.Contract(voteAbi, process.env.voteCA);
    let contract2 = cont2.methods
      .startVote(tokenId)
      .send({ from: serverAccount }, async (err, response) => {
        if (!err) {
          console.log('Voting 상태로 변경 성공!');
        } else {
          console.log(err);
          console.log('Voting 상태로 변경 실패!');
        }
      });

    res.send('Success');
  },

  voteToken: async (req, res, metadata) => {
    console.log('ahah', metadata);
    const {
      tokenId,
      tokenOwnerAddress,
      tokenPrice,
      voteAddress,
      voterPrice,
      multiAuctionAddressList,
      multiAuctionAddressListLength,
      type,
      choice,
    } = metadata;
    console.log('CHOCIE!', choice);
    const serverAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    let cont = new web3.eth.Contract(voteAbi, process.env.voteCA);
    let contract = await cont.methods
      .doVote(tokenId, voterPrice, choice)
      .send(
        { from: voteAddress, gasPrice: '90000', gas: 6721975 },
        async (err, response) => {
          if (!err) {
            console.log('Voter added 성공!');
            const filter = {
              tokenId: tokenId,
              'multiAuctionAddressList.multiAuctionAddress': voteAddress,
            };
            const update = {
              'multiAuctionAddressList.$.isVoted': true,
            };

            await normalData
              .findOneAndUpdate(filter, update)
              .then((response) => {
                console.log(response, 'Normaldata isVoted 변경 완료!');
              })
              .catch((err) => {
                console.log(err, 'Normaldata isVoted 변경 실패!');
              });
          } else {
            console.log(err);
            console.log('Vote isVoted changed failed!');
          }
        }
      );

    let cont2 = new web3.eth.Contract(voteAbi, process.env.voteCA);
    let checkAllSubmitVote = await cont2.methods.getTotalVote(tokenId).call();

    if (checkAllSubmitVote == multiAuctionAddressListLength) {
      console.log('INSIDE! INSIDE!');
      let cont3 = new web3.eth.Contract(voteAbi, process.env.voteCA);
      let txHash = null;
      let contract = await cont3.methods
        .endVote(tokenId, multiAuctionAddressList)
        .send(
          { from: serverAccount, gasPrice: '90000', gas: 6721975 },
          async (err, result) => {
            if (!err) {
              console.log('Success!===========', result);
              txHash = result;
            } else {
              console.log('Failed!');
            }
          }
        )
        .on('receipt', (result) => {
          console.log('RASRAOMYKASD!!!!!!!!!, result ', result);
          console.log(result.events.AgreeOrDisAgree.returnValues);
          console.log(result.events.AgreeOrDisAgree.returnValues.result);
          if (result.events.AgreeOrDisAgree.returnValues.result === true) {
            const filter = { tokenId: tokenId };
            const update = { votedFinished: true };
            normalData
              .findOneAndUpdate(filter, update)
              .then((response) => {
                console.log('EndVote 성공 및 votedFinished 변경 성공!');
              })
              .catch((err) => {
                console.log(err, 'EndVote 성공했지만 votedFinished 변경 실패!');
              });

            voteState
              .findOneAndDelete({ tokenId: tokenId })
              .then((response) => {
                console.log('EndVote 후에 VoteState 삭제!');
              })
              .catch((err) => {
                console.log(err, 'EndVote 성공했지만 VoteState 변경 실패!');
              });
          } else {
            console.log('ELSE RASRAOMYKASD!!!!!!!!!, result ', result);
            console.log(result.events.AgreeOrDisAgree.returnValues);
            console.log(result.events.AgreeOrDisAgree.returnValues.result);
            const filter = { tokenId: tokenId };
            const update = { state: 'Ended' };
            voteState
              .findOneAndUpdate(filter, update)
              .then((response) => {
                console.log('EndVote 후에 VoteState Ended로 변경!');
              })
              .catch((err) => {
                console.log(err, 'EndVote 성공했지만 Ended로 변경 실패!');
              });
          }
        });
    }
    res.send('Success');
  },

  voteResult: async (req, res, metadata) => {
    const {
      tokenId,
      tokenOwnerAddress,
      tokenPrice,
      voteAddress,
      voterPrice,
      multiAuctionAddressList,
      multiAuctionAddressListLength,
      type,
      choice,
    } = metadata;

    const serverAccount = process.env.serverAddress;
    const privateKey = process.env.serverAddress_PK;
    let cont = new web3.eth.Contract(voteAbi, process.env.voteCA);

    let cont2 = new web3.eth.Contract(voteAbi, process.env.voteCA);
    let checkAllSubmitVote = await cont2.methods.getTotalVote(tokenId).call();
    // 총 투표인원이 다 투표 했을 경우
    if (checkAllSubmitVote === multiAuctionAddressListLength) {
      let cont3 = new web3.eth.Contract(voteAbi, process.env.voteCA);
      let contract = await cont3.methods
        .endVote(tokenId, multiAuctionAddressList)
        .send(
          { from: serverAccount, gasPrice: '90000', gas: 7000000 },
          async (err, result) => {
            if (!err) {
              console.log('Success!===========', result);
            } else {
              console.log('Failed!');
            }
          }
        );

      console.log('============================', contract);
      if (contract === true) {
        const filter = { tokenId: tokenId };
        const update = { votedFinished: true };
        normalData
          .findOneAndUpdate(filter, update)
          .then((response) => {
            console.log('EndVote 성공 및 votedFinished 변경 성공!');
          })
          .catch((err) => {
            console.log(err, 'EndVote 성공했지만 votedFinished 변경 실패!');
          });

        voteState
          .findOneAndDelete({ tokenId: tokenId })
          .then((response) => {
            console.log('EndVote 후에 VoteState 삭제!');
          })
          .catch((err) => {
            console.log(err, 'EndVote 성공했지만 VoteState 변경 실패!');
          });
      } else {
        const filter = { tokenId: tokenId };
        const update = { state: 'Ended' };
        voteState
          .findOneAndUpdate(filter, update)
          .then((response) => {
            console.log('EndVote 후에 VoteState Ended로 변경!');
          })
          .catch((err) => {
            console.log(err, 'EndVote 성공했지만 Ended로 변경 실패!');
          });
      }
    }
  },
};
