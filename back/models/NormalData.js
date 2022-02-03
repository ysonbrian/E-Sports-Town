const mongoose = require('mongoose');

const NormalDataSchema = mongoose.Schema(
  {
    id: Number,
    userAddress: String,
    name: String,
    description: String,
    price: Number,
    tokenURI: String,
    tokenId: String,
    imgURI: String,
    type: String,
    votedFinished: { type: Boolean, default: true },
    multiAuctionAddressList: [
      new mongoose.Schema({
        multiAuctionAddress: String,
        bidPrice: Number,
        isVoted: { type: Boolean, default: false },
        created_at: { type: Date, default: Date.now },
      }),
    ],
    created_at: { type: Date, default: Date.now },
  },
  { collection: 'normaldata' }
);

module.exports = mongoose.model('NormalData', NormalDataSchema);
