const mongoose = require('mongoose');

const MultiAuctionDataSchema = new mongoose.Schema({
  id: Number,
  tokenId: Number,
  tokenOwnerAddress: String,
  totalJoinerCnt: Number,
  GroupAddressList: [
    new mongoose.Schema({
      GroupAddress: String,
    }),
  ],
  GroupPricePer1: Number,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MultiAuctionData', MultiAuctionDataSchema);
