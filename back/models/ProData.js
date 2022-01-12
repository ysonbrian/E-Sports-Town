const mongoose = require('mongoose');

const ProDataSchema = mongoose.Schema(
  {
    id: Number,
    userAddress: String,
    name: String,
    description: String,
    master: String,
    price: Number,
    path: String,
    imgURI: String,
    tokenId: String,
    created_at: { type: Date, default: Date.now },
  },
  { collection: 'prodata' }
);

module.exports = mongoose.model('ProData', ProDataSchema);
