const mongoose = require('mongoose');

const AuctionDataSchema = new mongoose.Schema({
  id: Number,
  tokenId: Number,
  tokenOwnerAddress: String,
  biddingList: [
    new mongoose.Schema({
      bidAddress: String,
      bidPrice: Number,
      created_at: { type: Date, default: Date.now },
    }),
  ],
  created_at: { type: Date, default: Date.now },
});

AuctionDataSchema.methods.addBid = function (info) {
  this.biddingList.push({ bidAddress: info.id, bidPrice: info.bidPrice });
  return this.save();
};

module.exports = mongoose.model('AuctionData', AuctionDataSchema);
