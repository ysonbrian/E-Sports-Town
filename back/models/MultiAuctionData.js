const mongoose = require('mongoose');

const MultiAuctionDataSchema = new mongoose.Schema({
  id: Number,
  tokenId: Number,
  tokenOwnerAddress: String,
  GroupAddress: String,
  GroupPricePer1: Number,
  created_at: { type: Date, default: Date.now },
});

//MultiAuctionDataSchema.methods.addBid = function (info) {
//  this.GroupingList.push({ bidAddress: info.id, bidPrice: info.bidPrice });
//  return this.save();
//};

module.exports = mongoose.model('MultiAuctionData', MultiAuctionDataSchema);
