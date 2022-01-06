const mongoose = require('mongoose');

const MetadataSchema = new mongoose.Schema({
  id: Number,
  userAddress: String,
  imgURI: String,
  description: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Metadata', MetadataSchema);
