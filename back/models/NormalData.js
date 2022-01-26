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
    multiOwners: [
      new mongoose.Schema({
        userAddress: String,
        bidPrice: Number,
        created_at: { type: Date, default: Date.now },
      }),
    ],
    created_at: { type: Date, default: Date.now },
  },
  { collection: 'normaldata' }
);

module.exports = mongoose.model('NormalData', NormalDataSchema);
