const mongoose = require('mongoose');

const MultiAuctionDataSchema = new mongoose.Schema({
  id: Number,
  tokenId: Number,
  tokenOwnerAddress: String,
  multiAuctionAddressList: [
    new mongoose.Schema({
      multiAuctionAddress: String,
      bidPrice: Number,
      created_at: { type: Date, default: Date.now },
    }),
  ],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MultiAuctionData', MultiAuctionDataSchema);
